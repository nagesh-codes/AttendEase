package com.attendease.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.dto.CollegeApplicationRequestDTO;
import com.attendease.backend.service.CollegeApplicationService;

@RestController
@RequestMapping("/api/college-application")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class CollegeApplicationController{
	private CollegeApplicationService collegeApplicationService;
	
	public CollegeApplicationController(CollegeApplicationService collegeApplicationService) {
		this.collegeApplicationService = collegeApplicationService;
	}
	
	@PostMapping("/collegeApplication")
	public ResponseEntity<?> newCollegeApplication(@RequestBody CollegeApplicationRequestDTO dto) {
		collegeApplicationService.addCollegeApllication(dto);
		return ResponseEntity.ok("Application submitted.");
	}
}