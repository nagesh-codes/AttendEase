package com.attendease.backend.dto;

import java.time.LocalDateTime;

public class PendingTeachersResponseDTO{
	private Long id;
	private String username;
	private String name;
	private String email;
	private LocalDateTime createdAt;
	
	public PendingTeachersResponseDTO(String name,String username,LocalDateTime createdAt) {
		this.name = name;
		this.username = username;
		this.createdAt = createdAt;
	}
	
	public PendingTeachersResponseDTO() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	};
	
	
}