package com.attendease.backend.service;

import com.attendease.backend.dto.CollegeListResponseDTO;
import com.attendease.backend.entity.CollegeStatus;
import com.attendease.backend.repository.CollegeRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CollegeService{	
	private final CollegeRepository collegeRepository;
	
	public CollegeService(CollegeRepository collegeRepository) {
		this.collegeRepository = collegeRepository;
	}
	
	public List<CollegeListResponseDTO> getActiveColleges(){
		return collegeRepository.findByStatus(CollegeStatus.ACTIVE)
                .stream()
                .map(c -> new CollegeListResponseDTO(c.getName(),c.getId()))
                .toList();
	};
	
}