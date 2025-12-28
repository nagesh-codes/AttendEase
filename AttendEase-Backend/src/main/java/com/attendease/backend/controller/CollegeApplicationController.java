package com.attendease.backend.controller;

import java.util.Collections;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.dto.CollegeApplicationRequestDTO;
import com.attendease.backend.repository.UserRepository;
import com.attendease.backend.service.CollegeApplicationService;

@RestController
@RequestMapping("/api/college-application")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class CollegeApplicationController{
	private CollegeApplicationService collegeApplicationService;
	private final UserRepository userRepository;
	
	public CollegeApplicationController(CollegeApplicationService collegeApplicationService,UserRepository userRepository) {
		this.collegeApplicationService = collegeApplicationService;
		this.userRepository = userRepository;
	}
	
	@PostMapping("/collegeApplication")
	public ResponseEntity<?> newCollegeApplication(@RequestBody CollegeApplicationRequestDTO dto) {
		collegeApplicationService.addCollegeApllication(dto);
		return ResponseEntity.ok("Application submitted.");
	}
	
	@PostMapping("/checkEmail")
	public ResponseEntity<?> checkEmail(@RequestBody EmailCheckRequest req) {
		boolean exists = userRepository.existsByEmail(req.getEmail());
		return ResponseEntity.ok(Collections.singletonMap("exists", exists));
	}
	
	static class EmailCheckRequest {
        private String email;
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
    }
}