package com.attendease.backend.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.attendease.backend.dto.SystemAdminRequestOtpDTO;
import com.attendease.backend.entity.SystemAdminOtp;
import com.attendease.backend.repository.SystemAdminOtpRepository;


@Service
public class SystemAdminOtpService {
	@Value("${SystemAdminEmail}")
    private String adminEmail;
	
	@Autowired
	public static final SecureRandom secureRandom = new SecureRandom();
	private final EmailService emailService;
	private final SystemAdminOtpRepository systemAdminOtpRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	public static String generateOtp() {
		int randomOtp = secureRandom.nextInt(0,1000000);
		return String.format("%06d", randomOtp);
	}
	
	public SystemAdminOtpService(EmailService emailService,SystemAdminOtpRepository systemAdminOtpRepository,PasswordEncoder passwordEncoder) {
		this.emailService = emailService;
		this.systemAdminOtpRepository = systemAdminOtpRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Transactional
	public String generateAndSendOtp() {
		
		String otp = generateOtp();
		String refId = UUID.randomUUID().toString().substring(0,8);
		
		String hashedOtp = passwordEncoder.encode(otp);
		
		SystemAdminOtp otpEntity = new SystemAdminOtp();
		
		otpEntity.setRefId(refId);
		otpEntity.setOtp(hashedOtp);
		otpEntity.setUsed(false);
		
		otpEntity.setExpiresAt(LocalDateTime.now().plusMinutes(5));
		
		systemAdminOtpRepository.saveAndFlush(otpEntity);
		
		String text = "<!DOCTYPE html>\r\n"
				+ "<html>\r\n"
				+ "<head>\r\n"
				+ "    <meta charset=\"UTF-8\">\r\n"
				+ "    <title>AttendEase Admin OTP</title>\r\n"
				+ "</head>\r\n"
				+ "<body style=\"margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;\">\r\n"
				+ "\r\n"
				+ "<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\r\n"
				+ "    <tr>\r\n"
				+ "        <td align=\"center\" style=\"padding:40px 0;\">\r\n"
				+ "            <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\"\r\n"
				+ "                   style=\"background-color:#ffffff; border-radius:8px; overflow:hidden;\">\r\n"
				+ "\r\n"
				+ "                <!-- Header -->\r\n"
				+ "                <tr>\r\n"
				+ "                    <td align=\"center\" style=\"background-color:#1abc9c; padding:20px;\">\r\n"
				+ "                        <h1 style=\"margin:0; color:#ffffff;\">AttendEase</h1>\r\n"
				+ "                        <p style=\"margin:6px 0 0; color:#eafff9;\">\r\n"
				+ "                            System Admin Access\r\n"
				+ "                        </p>\r\n"
				+ "                    </td>\r\n"
				+ "                </tr>\r\n"
				+ "\r\n"
				+ "                <!-- Content -->\r\n"
				+ "                <tr>\r\n"
				+ "                    <td style=\"padding:30px; color:#333333;\">\r\n"
				+ "                        <h2 style=\"color:#1abc9c;\">One-Time Password (OTP)</h2>\r\n"
				+ "\r\n"
				+ "                        <p>\r\n"
				+ "                            A request was made to access the <strong>AttendEase System Admin Panel</strong>.\r\n"
				+ "                        </p>\r\n"
				+ "\r\n"
				+ "                        <p>\r\n"
				+ "                            Please use the following One-Time Password to proceed:\r\n"
				+ "                        </p>\r\n"
				+ "\r\n"
				+ "                        <div style=\"\r\n"
				+ "                            margin:30px 0;\r\n"
				+ "                            padding:15px;\r\n"
				+ "                            background-color:#f0fdf9;\r\n"
				+ "                            border:1px dashed #1abc9c;\r\n"
				+ "                            text-align:center;\r\n"
				+ "                            font-size:28px;\r\n"
				+ "                            font-weight:bold;\r\n"
				+ "                            letter-spacing:6px;\r\n"
				+ "                            color:#1abc9c;\r\n"
				+ "                        \">\r\n"
				+ "                            {'"+otp+"'}\r\n"
				+ "                        </div>\r\n"
				+ "\r\n"
				+ "                        <p>\r\n"
				+ "                            This OTP is valid for <strong>5 minutes</strong> and can be used only once.\r\n"
				+ "                        </p>\r\n"
				+ "\r\n"
				+ "                        <p style=\"color:#555555;\">\r\n"
				+ "                            If you did not request this login, please ignore this email.\r\n"
				+ "                            No further action is required.\r\n"
				+ "                        </p>\r\n"
				+ "\r\n"
				+ "                        <p style=\"margin-top:30px;\">\r\n"
				+ "                            Regards,<br>\r\n"
				+ "                            <strong>AttendEase Security System</strong>\r\n"
				+ "                        </p>\r\n"
				+ "                    </td>\r\n"
				+ "                </tr>\r\n"
				+ "\r\n"
				+ "                <!-- Footer -->\r\n"
				+ "                <tr>\r\n"
				+ "                    <td align=\"center\"\r\n"
				+ "                        style=\"background-color:#f0f0f0; padding:15px; font-size:12px; color:#777777;\">\r\n"
				+ "                        This is an automated security email. Please do not reply.\r\n"
				+ "                    </td>\r\n"
				+ "                </tr>\r\n"
				+ "\r\n"
				+ "            </table>\r\n"
				+ "        </td>\r\n"
				+ "    </tr>\r\n"
				+ "</table>\r\n"
				+ "\r\n"
				+ "</body>\r\n"
				+ "</html>\r\n"
				+ "";
		
		emailService.sendEmail(adminEmail, "Your AttendEase System Admin Login OTP.",text);
		
		return refId;
	}
	
	public boolean verifyOtp(SystemAdminRequestOtpDTO dto) {
		SystemAdminOtp otpEntity = systemAdminOtpRepository
				.findByRefId(dto.getRefId())
				.orElseThrow(() -> new RuntimeException("OTP NOT FOUND"));
		
		if(otpEntity.getExpiresAt().isBefore(LocalDateTime.now()) || otpEntity.getUsed()) {
			return false;
		}
		
		if(passwordEncoder.matches(dto.getOtp(), otpEntity.getOtp())){
			otpEntity.setUsed(true);
			systemAdminOtpRepository.save(otpEntity);
			
			String AccessToken = jwtService
			return true;
		}else {
			return false;
		}
	}
	
}