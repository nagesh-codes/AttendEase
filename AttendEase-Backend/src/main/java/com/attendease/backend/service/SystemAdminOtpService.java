package com.attendease.backend.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.attendease.backend.dto.SystemAdminOtpRequestDTO;
import com.attendease.backend.dto.SystemAdminRequestOtpDTO;
import com.attendease.backend.dto.SystemAdminTokenResponseDTO;
import com.attendease.backend.entity.SystemAdminOtp;
import com.attendease.backend.entity.SystemAdminRefreshTokens;
import com.attendease.backend.repository.SystemAdminOtpRepository;
import com.attendease.backend.repository.SystemAdminRefreshTokenRepository;
import com.attendease.backend.repository.SystemAdminRepository;
import com.attendease.backend.util.HashUtil;
import com.attendease.backend.util.TemplateLoader;

@Service
public class SystemAdminOtpService {

	@Autowired
	public static final SecureRandom secureRandom = new SecureRandom();
	private final EmailService emailService;
	private final SystemAdminOtpRepository systemAdminOtpRepository;
	private final SystemAdminRefreshTokenRepository systemAdminRefreshTokenRepository;
	private final JwtService jwtService;
	private final HashUtil hashUtil;
	private final TemplateLoader templateLoader;
	private final SystemAdminRepository systemAdminRepository;

	private final PasswordEncoder passwordEncoder;

	public static String generateOtp() {
		int randomOtp = secureRandom.nextInt(0, 1000000);
		return String.format("%06d", randomOtp);
	}

	public SystemAdminOtpService(EmailService emailService, SystemAdminOtpRepository systemAdminOtpRepository,
			SystemAdminRefreshTokenRepository systemAdminRefreshTokenRepository, PasswordEncoder passwordEncoder,
			JwtService jwtService, HashUtil hashUtil,TemplateLoader templateLoader,SystemAdminRepository systemAdminRepository) {
		this.emailService = emailService;
		this.systemAdminOtpRepository = systemAdminOtpRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.hashUtil = hashUtil;
		this.systemAdminRefreshTokenRepository = systemAdminRefreshTokenRepository;
		this.templateLoader = templateLoader;
		this.systemAdminRepository = systemAdminRepository;
	}

	@Transactional
	public String generateAndSendOtp(SystemAdminOtpRequestDTO dto) {
		
		systemAdminRepository.findByEmail(dto.getEmail())
				.orElseThrow(() -> new RuntimeException("Email is not valid"));

		String otp = generateOtp();
		String refId = UUID.randomUUID().toString().substring(0, 8);
		System.out.println(otp);
		String hashedOtp = passwordEncoder.encode(otp);

		SystemAdminOtp otpEntity = new SystemAdminOtp();

		otpEntity.setRefId(refId);
		otpEntity.setOtp(hashedOtp);
		otpEntity.setUsed(false);
		otpEntity.setExpiresAt(LocalDateTime.now().plusMinutes(5));

		String text = templateLoader.loadTemplate("OTP_email");
		text = text.replace("{{OTP}}", otp);
		emailService.sendEmail(dto.getEmail(), "Your AttendEase System Admin Login OTP.", text);
		
		systemAdminOtpRepository.saveAndFlush(otpEntity);

		return refId;
	}

	@Transactional
	public SystemAdminTokenResponseDTO verifyOtp(SystemAdminRequestOtpDTO dto) {
		SystemAdminOtp otpEntity = systemAdminOtpRepository
				.findByRefId(dto.getRefId())
				.orElseThrow(() -> new RuntimeException("OTP NOT FOUND"));

		if (otpEntity.getExpiresAt().isBefore(LocalDateTime.now()) || otpEntity.getUsed()) {
			throw new RuntimeException("OTP EXPIRED");
		}
		
		if (passwordEncoder.matches(dto.getOtp(), otpEntity.getOtp())) {
			otpEntity.setUsed(true);
			systemAdminOtpRepository.save(otpEntity);

			systemAdminRefreshTokenRepository.findAll()
					.forEach(token -> token.setRevoked(true));

			String AccessToken = jwtService.generateSystemAdminToken();
			String refreshToken = UUID.randomUUID().toString() + UUID.randomUUID();

			String refreshTokenHash = hashUtil.sha256(refreshToken);

			SystemAdminRefreshTokens tokenEntity = new SystemAdminRefreshTokens();
			tokenEntity.setToken(refreshTokenHash);
			tokenEntity.setExpiresAt(LocalDateTime.now().plusDays(7));

			systemAdminRefreshTokenRepository.save(tokenEntity);

			return new SystemAdminTokenResponseDTO(refreshToken, AccessToken,"SYSTEM_ADMIN");
		} else {
			throw new RuntimeException("OTP INVALID");
		}
	}

}