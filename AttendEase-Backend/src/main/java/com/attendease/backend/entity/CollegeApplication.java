package com.attendease.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "college_applications")
public class CollegeApplication {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "college_name", nullable = false)
	private String collegeName;

	@Column(name = "authority_name", nullable = false)
	private String authorityName;

	@Column(name = "authority_role", nullable = false)
	private String authorityRole;

	@Column(name = "Official_email", nullable = false)
	private String officialEmail;

	@Column(name = "address")
	private String Addess;

	@Column(name = "Phone")
	private String Phone;

	public String getAddess() {
		return Addess;
	}

	public void setAddess(String addess) {
		Addess = addess;
	}

	public String getPhone() {
		return Phone;
	}

	public void setPhone(String phone) {
		Phone = phone;
	}

	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private CollegeApplicationStatus status;

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt = LocalDateTime.now();

	@Column(name = "reviewed_at")
	private LocalDateTime reviewedAt;

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

	public CollegeApplicationStatus getStatus() {
		return status;
	}

	public void setStatus(CollegeApplicationStatus status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getReviewedAt() {
		return reviewedAt;
	}

	public void setReviewedAt(LocalDateTime reviewedAt) {
		this.reviewedAt = reviewedAt;
	}

}