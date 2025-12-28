package com.attendease.backend.dto;

public class SystemAdminTokenResponseDTO {
	private String refreshToken;
	private String accessToken;
	private String role;

	public SystemAdminTokenResponseDTO(String refreshToken, String accessToken,String role) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.role = role;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public String getAccessToken() {
		return accessToken;
	}
	
	public String getRole() {
		return role;
	}

}