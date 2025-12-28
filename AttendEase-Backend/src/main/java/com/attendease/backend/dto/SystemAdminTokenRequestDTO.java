package com.attendease.backend.dto;

public class SystemAdminTokenRequestDTO{
	private String refreshToken;

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
		
}