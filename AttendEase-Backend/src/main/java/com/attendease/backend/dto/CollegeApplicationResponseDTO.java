package com.attendease.backend.dto;

import java.time.LocalDateTime;

public class CollegeApplicationResponseDTO {
	private Long id;
	private String collegeName;
	private String authorityName;
	private String authorityRole;
	private String officialEmail;
	private LocalDateTime createdAt;

	public CollegeApplicationResponseDTO(Long id, String collegeName, String authorityName, String authorityRole,
			String officialEmail, LocalDateTime createdAt) {
		this.id = id;
		this.collegeName = collegeName;
		this.authorityName = authorityName;
		this.authorityRole = authorityRole;
		this.officialEmail = officialEmail;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

}