package com.attendease.backend.service;

import com.attendease.backend.dto.CollegeInfoResponseDTO;
import com.attendease.backend.dto.CollegeListResponseDTO;
import com.attendease.backend.dto.GetCollegeInfoResponseDTO;
import com.attendease.backend.entity.College;
import com.attendease.backend.entity.CollegeStatus;
import com.attendease.backend.repository.CollegeRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CollegeService {

	private final CollegeRepository collegeRepository;

	public CollegeService(CollegeRepository collegeRepository) {
		this.collegeRepository = collegeRepository;
	}

	public List<CollegeListResponseDTO> getActiveColleges() {
		return collegeRepository.findByStatus(CollegeStatus.ACTIVE)
				.stream()
				.map(c -> new CollegeListResponseDTO(c.getName(), c.getId()))
				.toList();
	};

	public List<CollegeInfoResponseDTO> getAllColleges() {
		return collegeRepository.findByStatus(CollegeStatus.ACTIVE)
				.stream()
				.map(c -> new CollegeInfoResponseDTO(c.getName(), c.getCreatedBy(), c.getCreatedAt(), c.getEmail()))
				.toList();
	}

	public GetCollegeInfoResponseDTO getCollegeInfo(Long collegeId) {
		College clg = collegeRepository.findById(collegeId)
				.orElseThrow(() -> new RuntimeException("Colleg Not Found"));
		GetCollegeInfoResponseDTO dto = new GetCollegeInfoResponseDTO(clg.getName(), clg.getAddess(), clg.getPhone(),
				clg.getEmail());
		return dto;
	}
}