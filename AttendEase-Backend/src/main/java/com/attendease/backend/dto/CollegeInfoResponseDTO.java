package com.attendease.backend.dto;

import java.time.LocalDateTime;

public class CollegeInfoResponseDTO {
	private String name;
	private String createdBy;
	private LocalDateTime createdAt;
	private String email;

	public CollegeInfoResponseDTO(String name, String createdBy, LocalDateTime createdAt, String email) {
		this.name = name;
		this.createdAt = createdAt;
		this.createdBy = createdBy;
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

}