package com.attendease.backend.service;

import com.attendease.backend.dto.CollegeResponseDTO;
import com.attendease.backend.entity.College;
import java.util.List;

public interface CollegeService{
	List<CollegeResponseDTO> getActiveColleges();
}