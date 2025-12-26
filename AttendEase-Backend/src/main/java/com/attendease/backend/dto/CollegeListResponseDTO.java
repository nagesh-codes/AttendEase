package com.attendease.backend.dto;

public class CollegeListResponseDTO {
	private String name;
	private Long id;

	public CollegeListResponseDTO(String name, Long id) {
		this.name = name;
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CollegeListResponseDTO(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}