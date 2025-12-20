package com.attendease.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.service.CollegeApplicationService;
import com.attendease.backend.service.CollegeService;
import com.attendease.backend.service.EmailService;
import com.attendease.backend.dto.*;
import java.util.*;

@RestController
@RequestMapping("/api/colleges")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class CollegeController{
	
	@Autowired
    private CollegeService collegeService;
	private CollegeApplicationService collegeApplicationService;
	private EmailService emailService;
	
	public CollegeController(CollegeService collegeService,CollegeApplicationService collegeApplicationService, EmailService emailService) {
		this.collegeService = collegeService;
		this.collegeApplicationService = collegeApplicationService;
		this.emailService = emailService;
	}
	
	@PostMapping("/collegeApplication")
	public ResponseEntity<?> newCollegeApplication(@RequestBody CollegeApplicationRequestDTO dto){		
		collegeApplicationService.addCollegeApllication(dto);
		return ResponseEntity.ok("Application submitted.");
	}

	@GetMapping("/getCollegeList")
    public List<CollegeListResponseDTO> getAllActiveColleges() {
			return collegeService.getActiveColleges();
    }
	
}