package com.attendease.backend.dto;

import com.attendease.backend.entity.CollegeApplicationStatus;

public class CollegeApplicationRequestDTO {
	private String collegeName;
	private String authorityName;
	private String authorityRole;
	private String officialEmail;
	private CollegeApplicationStatus status;
	private String phone;
	private String address;

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCollegeName() {
		return collegeName;
	}

	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}

	public String getAuthorityName() {
		return authorityName;
	}

	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}

	public String getAuthorityRole() {
		return authorityRole;
	}

	public void setAuthorityRole(String authorityRole) {
		this.authorityRole = authorityRole;
	}

	public String getOfficialEmail() {
		return officialEmail;
	}

	public void setOfficialEmail(String officialEmail) {
		this.officialEmail = officialEmail;
	}

	public CollegeApplicationStatus getStatus() {
		return status;
	}

	public void setStatus(CollegeApplicationStatus status) {
		this.status = status;
	}

}