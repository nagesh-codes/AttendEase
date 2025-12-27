package com.attendease.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.attendease.backend.service.CollegeService;
import com.attendease.backend.dto.*;
import java.util.*;

@RestController
@RequestMapping("/api/colleges")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class CollegeController {

	@Autowired
	private CollegeService collegeService;

	public CollegeController(CollegeService collegeService) {
		this.collegeService = collegeService;
	}

	@GetMapping("/getCollegeList")
	public List<CollegeListResponseDTO> getAllActiveColleges() {
		return collegeService.getActiveColleges();
	}

}