package com.attendease.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.dto.*;
import com.attendease.backend.service.CollegeApplicationService;
import com.attendease.backend.service.CollegeService;
import com.attendease.backend.service.SystemAdminOtpService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/system-admin")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class SystemAdminController {
	private CollegeApplicationService collegeApplicationService;
	private SystemAdminOtpService systemAdminOtpService;
	private CollegeService collegeService;

	public SystemAdminController(CollegeApplicationService collegeApplicationService,
			SystemAdminOtpService systemAdminOtpService,CollegeService collegeService) {
		this.collegeApplicationService = collegeApplicationService;
		this.systemAdminOtpService = systemAdminOtpService;
		this.collegeService = collegeService;
	}

	@GetMapping("/pendingCollegeApplications")
	public List<CollegeApplicationResponseDTO> getAllPendingApplications() {
		return collegeApplicationService.getAllPendingCollegeApplication();
	}

	@PostMapping("/send-otp")
	public ResponseEntity<?> createOTP() {
		String refId = systemAdminOtpService.generateAndSendOtp();
		return ResponseEntity.ok(Map.of("message", "Email Sent", "refId", refId));
	}
	
	@PostMapping("/verify-otp")
	public SystemAdminTokenResponseDTO verifyOtp(@RequestBody SystemAdminRequestOtpDTO dto) {
		System.out.println(dto.getRefId());
		return systemAdminOtpService.verifyOtp(dto);
	}

	@PatchMapping("/updateCollegeStatus")
	public ResponseEntity<?> updateCollegeStatus(@RequestBody CollegeApplicationStatusRequestDTO dto) {
		collegeApplicationService.updateCollegeStatus(dto);
		return ResponseEntity.ok("Changes Saved");
	}

	@GetMapping("/getCollegeInfoList")
	public List<CollegeInfoResponseDTO> getAllColleges() {
		return collegeService.getAllColleges();
	}

	@GetMapping("/getUsersInfoList")
	public List<UsersInfoResponseDTO> getAllUers() {
		return collegeService.getAllUsers();
	}
	
}
