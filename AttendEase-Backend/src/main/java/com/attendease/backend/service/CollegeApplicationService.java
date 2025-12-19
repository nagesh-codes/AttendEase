package com.attendease.backend.service;

import org.springframework.stereotype.Service;

import com.attendease.backend.dto.CollegeApplicationRequestDTO;
import com.attendease.backend.dto.CollegeApplicationResponseDTO;
import com.attendease.backend.entity.CollegeApplication;
import com.attendease.backend.entity.CollegeApplicationStatus;
import com.attendease.backend.repository.CollegeApplicationRepository;
import java.util.List;
@Service
public class CollegeApplicationService{
	
	private CollegeApplicationRepository collegeApplicationRespository;
	
	public CollegeApplicationService(CollegeApplicationRepository collegeApplicationRepository) {
		this.collegeApplicationRespository = collegeApplicationRepository;
	}
	
	public void addCollegeApllication(CollegeApplicationRequestDTO dto) {
		CollegeApplication clgApp = new CollegeApplication();
		
		clgApp.setCollegeName(dto.getCollegeName());
		clgApp.setAuthorityName(dto.getAuthorityName());
		clgApp.setAuthorityRole(dto.getAuthorityRole());
		clgApp.setOfficialEmail(dto.getOfficialEmail());
		clgApp.setStatus(CollegeApplicationStatus.PENDING);
		
		collegeApplicationRespository.save(clgApp);
	}
	
	public List<CollegeApplicationResponseDTO> getAllPendingCollegeApplication(){
		return collegeApplicationRespository.findByStatus(CollegeApplicationStatus.PENDING)
				.stream()
				.map(c -> new CollegeApplicationResponseDTO(c.getId(),c.getCollegeName(),c.getAuthorityName(),c.getAuthorityRole(),c.getOfficialEmail(),c.getCreatedAt()))
				.toList();
	}
}