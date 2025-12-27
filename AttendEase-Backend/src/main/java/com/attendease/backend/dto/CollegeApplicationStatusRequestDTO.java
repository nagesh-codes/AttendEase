package com.attendease.backend.dto;

import com.attendease.backend.entity.CollegeApplicationStatus;

public class CollegeApplicationStatusRequestDTO {
	private Long id;
	private CollegeApplicationStatus status;

	public CollegeApplicationStatus getStatus() {
		return status;
	}

	public void setStatus(CollegeApplicationStatus status) {
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	

}