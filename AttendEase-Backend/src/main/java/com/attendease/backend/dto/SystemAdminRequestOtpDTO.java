package com.attendease.backend.dto;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SystemAdminRequestOtpDTO {
	private String otp;
	private String refId;

	public SystemAdminRequestOtpDTO(String otp, String refId) {
		this.otp = otp;
		this.refId = refId;
	}

	public String getRefId() {
		return refId;
	}

	public void setRefId(String refId) {
		this.refId = refId;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

}