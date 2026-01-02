package com.attendease.backend.dto;

import java.time.LocalDateTime;

public class PendingTeachersResponseDTO{
	private String username;
	private String name;
	private LocalDateTime createdAt;
	
	public PendingTeachersResponseDTO(String name,String username,LocalDateTime createdAt) {
		this.name = name;
		this.username = username;
		this.createdAt = createdAt;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
}