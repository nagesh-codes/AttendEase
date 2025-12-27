package com.attendease.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.attendease.backend.dto.CollegeApplicationRequestDTO;
import com.attendease.backend.dto.CollegeApplicationResponseDTO;
import com.attendease.backend.dto.CollegeApplicationStatusRequestDTO;
import com.attendease.backend.entity.College;
import com.attendease.backend.entity.CollegeApplication;
import com.attendease.backend.entity.CollegeApplicationStatus;
import com.attendease.backend.entity.CollegeStatus;
import com.attendease.backend.entity.Role;
import com.attendease.backend.entity.User;
import com.attendease.backend.entity.UserStatus;
import com.attendease.backend.repository.CollegeApplicationRepository;
import com.attendease.backend.repository.CollegeRepository;
import com.attendease.backend.repository.UserRepository;
import com.attendease.backend.util.TemplateLoader;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CollegeApplicationService {

	private CollegeApplicationRepository collegeApplicationRespository;
	private EmailService emailService;
	private CollegeRepository collegeRepository;
	private TemplateLoader templateLoader;
	private final PasswordEncoder passwordEncoder;
	private UserRepository userRepository;

	public CollegeApplicationService(CollegeApplicationRepository collegeApplicationRepository,
			EmailService emailService,CollegeRepository collegeRepository,TemplateLoader templateLoader,
			PasswordEncoder passwordEncoder,UserRepository userRepository) {
		this.collegeApplicationRespository = collegeApplicationRepository;
		this.emailService = emailService;
		this.collegeRepository = collegeRepository;
		this.templateLoader = templateLoader;
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
	}

	@Transactional
	public void addCollegeApllication(CollegeApplicationRequestDTO dto) {
		CollegeApplication clgApp = new CollegeApplication();

		clgApp.setCollegeName(dto.getCollegeName());
		clgApp.setAuthorityName(dto.getAuthorityName());
		clgApp.setAuthorityRole(dto.getAuthorityRole());
		clgApp.setOfficialEmail(dto.getOfficialEmail());
		clgApp.setStatus(CollegeApplicationStatus.PENDING);

		collegeApplicationRespository.saveAndFlush(clgApp);

		String text = templateLoader.loadTemplate("college_application_submission");
		emailService.sendEmail(dto.getOfficialEmail(), "College Application Submitted Successfully – AttendEase\r\n",
				text);
	}

	public List<CollegeApplicationResponseDTO> getAllPendingCollegeApplication() {
		return collegeApplicationRespository.findByStatusOrderByCreatedAtDesc(CollegeApplicationStatus.PENDING)
				.stream()
				.map(c -> new CollegeApplicationResponseDTO(c.getId(), c.getCollegeName(), c.getAuthorityName(),
						c.getAuthorityRole(), c.getOfficialEmail(), c.getCreatedAt()))
				.toList();
	}
	
	@Transactional
	public void updateCollegeStatus(CollegeApplicationStatusRequestDTO dto) {
		CollegeApplication clgAppnEntity = collegeApplicationRespository.findById(dto.getId())
				.orElseThrow(() -> new RuntimeException("college not found"));
		clgAppnEntity.setStatus(dto.getStatus());
		clgAppnEntity.setReviewedAt(LocalDateTime.now());
		
		if(dto.getStatus() == CollegeApplicationStatus.APPROVED) {
			College clgEntity = new College();
			clgEntity.setName(clgAppnEntity.getCollegeName());
			clgEntity.setEmail(clgAppnEntity.getOfficialEmail());
			clgEntity.setCreatedBy(clgAppnEntity.getAuthorityName());
			clgEntity.setStatus(CollegeStatus.ACTIVE);
			
			collegeRepository.save(clgEntity);
			
			User userEntity = new User();
			userEntity.setName(clgAppnEntity.getAuthorityName());
			userEntity.setAccountStatus(UserStatus.ACTIVE);
			userEntity.setEmail(clgAppnEntity.getOfficialEmail());
			String username = clgAppnEntity.getOfficialEmail().split("@")[0];
			userEntity.setUsername(username);
			userEntity.setRole(Role.ADMIN);
			userEntity.setCollege(clgEntity);
			String hashedPassword = passwordEncoder.encode(clgAppnEntity.getOfficialEmail());
			userEntity.setPasswordHash(hashedPassword);
			
			userRepository.save(userEntity);
			
			String text = templateLoader.loadTemplate("college_application_approval_email");
			text = text.replace("{{USERNAME}}", username);
			text = text.replace("{{PASSWORD}}", clgAppnEntity.getOfficialEmail());
			text = text.replace("{{LOGIN_LINK}}", "${FRONTEND_URL}/Login");
			text = text.replace("{{COLLEGE_NAME}}", clgAppnEntity.getCollegeName());
			emailService.sendEmail(clgAppnEntity.getOfficialEmail(), "AttendEase - Application Approved & Login Credentials", text);
		}
		
		collegeApplicationRespository.save(clgAppnEntity);
	}
}