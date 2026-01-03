package com.attendease.backend.dto;

import com.attendease.backend.entity.UserStatus;

public class UpdateTeacherStatusRequestDTO{
	private UserStatus status;
	private Long id;
	private Long collegeId;
	
	public UserStatus getStatus() {
		return status;
	}
	public void setStatus(UserStatus status) {
		this.status = status;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCollegeId() {
		return collegeId;
	}
	public void setCollegeId(Long collegeId) {
		this.collegeId = collegeId;
	}
	
	
}