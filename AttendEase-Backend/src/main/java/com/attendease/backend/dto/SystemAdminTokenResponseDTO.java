package com.attendease.backend.dto;

public class SystemAdminTokenResponseDTO {
	private String refreshToken;
	private String accessToken;

	public SystemAdminTokenResponseDTO(String refreshToken, String accessToken) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public String getAccessToken() {
		return accessToken;
	}

}