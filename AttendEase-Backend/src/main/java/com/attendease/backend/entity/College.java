package com.attendease.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "colleges")
public class College{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(name = "join_code",nullable = false,unique = true)
	private Long joinCode;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private CollegeStatus status;
	
	@Column(name="created_at")
	private LocalDateTime createdAt = LocalDateTime.now();

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getJoinCode() {
		return joinCode;
	}

	public void setJoinCode(Long joinCode) {
		this.joinCode = joinCode;
	}

	public CollegeStatus getStatus() {
		return status;
	}

	public void setStatus(CollegeStatus status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
}