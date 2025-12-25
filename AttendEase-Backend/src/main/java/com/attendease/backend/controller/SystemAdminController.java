package com.attendease.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.dto.*;
import com.attendease.backend.service.CollegeApplicationService;
import com.attendease.backend.service.SystemAdminOtpService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/system-admin")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class SystemAdminController{
	private CollegeApplicationService collegeApplicationService;
	private SystemAdminOtpService systemAdminOtpService;
	private SystemAdminRequestOtpDTO systemAdminRequestOtpDTO;
	
	public SystemAdminController(CollegeApplicationService collegeApplicationService,SystemAdminOtpService systemAdminOtpService) {
		this.collegeApplicationService = collegeApplicationService;
		this.systemAdminOtpService = systemAdminOtpService;
	}
	
	@GetMapping("/pendingCollegeApplications")
	public List<CollegeApplicationResponseDTO> getAllPendingApplications(){
		return collegeApplicationService.getAllPendingCollegeApplication();
	}
	
	@PostMapping("/send-otp")
	public ResponseEntity<?> createOTP(){
		String refId = systemAdminOtpService.generateAndSendOtp();
		return ResponseEntity.ok(Map.of("message","Email Sent","refId",refId));
	}
	
	@PostMapping("/verify-otp")
	public SystemAdminTokenResponseDTO verifyOtp(@RequestBody SystemAdminRequestOtpDTO dto){
		System.out.println(dto.getRefId());
		return systemAdminOtpService.verifyOtp(dto);
	}
	
//	@PostMapping("/refresh-token")
//	public SystemAdminTokenResponseDTO refreshToken() {
//		
//	}
}
