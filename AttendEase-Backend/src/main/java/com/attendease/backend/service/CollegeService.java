package com.attendease.backend.service;

import com.attendease.backend.dto.CollegeInfoResponseDTO;
import com.attendease.backend.dto.CollegeListResponseDTO;
import com.attendease.backend.dto.UsersInfoResponseDTO;
import com.attendease.backend.entity.CollegeStatus;
import com.attendease.backend.repository.CollegeRepository;
import com.attendease.backend.repository.UserRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CollegeService {

	private final UserRepository userRepository;
	private final CollegeRepository collegeRepository;

	public CollegeService(CollegeRepository collegeRepository, UserRepository userRepository) {
		this.collegeRepository = collegeRepository;
		this.userRepository = userRepository;
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

	public List<UsersInfoResponseDTO> getAllUsers() {
		return userRepository.findAll()
				.stream()
				.map(u -> new UsersInfoResponseDTO(u.getName(), u.getUsername(), u.getRole(), u.getCollege(),
						u.getAccountStatus(), u.getCreatedAt(), u.getEmail()))
				.toList();

	}
}