package com.attendease.backend.dto;

public class PendingTeachersRequestDTO{
	private String username;
	private Long collegeId;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Long getCollegeId() {
		return collegeId;
	}
	public void setCollegeId(Long collegeId) {
		this.collegeId = collegeId;
	}
	
	
}