package com.attendease.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.dto.*;
import com.attendease.backend.service.UserService;

@RestController
@RequestMapping("/api/college-admin/")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class CollegeAdminController{
	@Autowired
	private UserService userService;
	
	public CollegeAdminController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/pending-teachers")
	public List<PendingTeachersResponseDTO> pendingTeachers(@ModelAttribute PendingTeachersRequestDTO dto){
		System.out.println("inside the method");
//		try {			
			return userService.pendingTeachers(dto);
//		}catch(Exception e) {
//			return List<PendingTeachersResponseDTO>;
//		}
	}
}