package com.attendease.backend.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SystemAdminRequestOtpDTO{
	private String otp;
	
	public SystemAdminRequestOtpDTO(String otp) {
		this.otp = otp;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}
	
	
}