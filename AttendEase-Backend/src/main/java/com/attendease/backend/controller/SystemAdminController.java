package com.attendease.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
		systemAdminOtpService.generateAndSendOtp();
		return ResponseEntity.ok("OTP successfully sent");
	}
	
	@PostMapping("/verify-otp")
	public ResponseEntity<?> verifyOtp(@RequestBody SystemAdminRequestOtpDTO dto){
		System.out.println(dto.getOtp());
		boolean isValid = systemAdminOtpService.verifyOtp(dto);
		if(isValid) {
			return ResponseEntity.ok("OTP SUCCESSFULLY MATCHED");
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("OTP NOT MATCHED");
//			return ResponseEntity.ok("");
		}
	}
}
