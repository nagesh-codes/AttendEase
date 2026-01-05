package com.attendease.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.dto.*;
import com.attendease.backend.service.CollegeService;
import com.attendease.backend.service.UserService;

@RestController
@RequestMapping("/api/college-admin/")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class CollegeAdminController {

	private final CollegeService collegeService;
	@Autowired
	private UserService userService;

	public CollegeAdminController(UserService userService, CollegeService collegeService) {
		this.userService = userService;
		this.collegeService = collegeService;
	}

	@GetMapping("/pending-teachers")
	public List<PendingTeachersResponseDTO> pendingTeachers(@ModelAttribute PendingTeachersRequestDTO dto) {
		return userService.pendingTeachers(dto);
	}

	@PatchMapping("/update-teacher-appn")
	public ResponseEntity<?> updateTeacherAppn(@RequestBody UpdateTeacherStatusRequestDTO dto) {
		try {
			userService.updateTeacherAppn(dto);
			return ResponseEntity.ok("changes saved");
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@GetMapping("/get-college-info")
	public GetCollegeInfoResponseDTO getCollegeIngo(@RequestParam Long collegeId) {
		return collegeService.getCollegeInfo(collegeId);
	}
}