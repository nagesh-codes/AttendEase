package com.attendease.backend.dto;

public class GetCollegeInfoResponseDTO {
	private String address;
	private String name;
	private String email;
	private String phone;

	public GetCollegeInfoResponseDTO(String name, String address, String phone, String email) {
		this.address = address;
		this.phone = phone;
		this.email = email;
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

}