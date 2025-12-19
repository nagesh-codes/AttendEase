package com.attendease.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.dto.*;
import com.attendease.backend.service.CollegeApplicationService;
import java.util.List;

@RestController
@RequestMapping("/api/systemadmin")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class SystemAdminController{
	private CollegeApplicationService collegeApplicationService;
	
	public SystemAdminController(CollegeApplicationService collegeApplicationService) {
		this.collegeApplicationService = collegeApplicationService;
	}
	
	@GetMapping("/pendingCollegeApplications")
	public List<CollegeApplicationResponseDTO> getAllPendingApplications(){
		return collegeApplicationService.getAllPendingCollegeApplication();
	}
}
