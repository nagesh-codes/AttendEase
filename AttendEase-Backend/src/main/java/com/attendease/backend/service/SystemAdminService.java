package com.attendease.backend.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.attendease.backend.dto.SystemAdminTokenRequestDTO;
import com.attendease.backend.dto.SystemAdminTokenResponseDTO;
import com.attendease.backend.entity.SystemAdminRefreshTokens;
import com.attendease.backend.repository.SystemAdminRefreshTokenRepository;
import com.attendease.backend.util.HashUtil;

@Service
public class SystemAdminService{
	
	private HashUtil hashUtil;
	private SystemAdminRefreshTokenRepository systemAdminRefreshTokenRepository;
	private JwtService jwtService;
	
	public SystemAdminService(HashUtil hashUtil,SystemAdminRefreshTokenRepository systemAdminRefreshTokenRepository,
			JwtService jwtService) {
		this.hashUtil = hashUtil;
		this.systemAdminRefreshTokenRepository = systemAdminRefreshTokenRepository;
		this.jwtService = jwtService;
	}
	
	public SystemAdminTokenResponseDTO refreshToken(SystemAdminTokenRequestDTO dto) {
		String incomingTokenHash = hashUtil.sha256(dto.getRefreshToken());
		SystemAdminRefreshTokens storedToken = systemAdminRefreshTokenRepository.findByToken(incomingTokenHash)
				.orElseThrow(() -> new RuntimeException("Token not found"));
		
		if(storedToken.isRevoked()) {
			throw new RuntimeException("Token has been revoked");
		}
		
		if (storedToken.getExpiresAt().isBefore(LocalDateTime.now())) {
	        throw new RuntimeException("Token expired");
	    }
		
		storedToken.setRevoked(true);
		systemAdminRefreshTokenRepository.save(storedToken);
		
		String newAccessToken = jwtService.generateSystemAdminToken(); 
	    String newRefreshToken = UUID.randomUUID().toString() + UUID.randomUUID();
	    String newRefreshTokenHash = hashUtil.sha256(newRefreshToken);
	    
	    SystemAdminRefreshTokens newTokenEntity = new SystemAdminRefreshTokens();
	    newTokenEntity.setToken(newRefreshTokenHash);
	    newTokenEntity.setExpiresAt(LocalDateTime.now().plusDays(7));
	    
	    systemAdminRefreshTokenRepository.save(newTokenEntity);
	    return new SystemAdminTokenResponseDTO(newRefreshToken, newAccessToken, "SYSTEM_ADMIN");
	}
}