package com.attendease.backend.dto;

import java.time.LocalDateTime;

import com.attendease.backend.entity.College;
import com.attendease.backend.entity.Role;
import com.attendease.backend.entity.UserStatus;

public class UsersInfoResponseDTO {
	private String name;
	private College college;
	private Role role;
	private LocalDateTime createdAt;
	private String username;
	private UserStatus accountStatus;
	private String email;

	public UsersInfoResponseDTO(String name, String username, Role role, College college, UserStatus accountStatus,
			LocalDateTime createdAt, String email) {
		this.name = name;
		this.username = username;
		this.role = role;
		this.college = college;
		this.accountStatus = accountStatus;
		this.createdAt = createdAt;
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public College getCollege() {
		return college;
	}

	public void setCollege(College college) {
		this.college = college;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public UserStatus getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(UserStatus accountStatus) {
		this.accountStatus = accountStatus;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}