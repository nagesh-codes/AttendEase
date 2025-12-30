package com.attendease.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.attendease.backend.dto.LoginRequestDTO;
import com.attendease.backend.dto.SignupRequestDto;
import com.attendease.backend.entity.College;
import com.attendease.backend.entity.Role;
import com.attendease.backend.entity.User;
import com.attendease.backend.entity.UserStatus;
import com.attendease.backend.repository.*;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CollegeRepository collegeRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
            CollegeRepository collegeRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.collegeRepository = collegeRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Transactional
    public void registerTeacher(SignupRequestDto dto) {

        College college = collegeRepository.findById(dto.getCollegeId()).orElse(null);

        User teacher = new User();
        teacher.setName(dto.getName());
        teacher.setUsername(dto.getUsername());
        teacher.setEmail(dto.getEmail());
        teacher.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        teacher.setRole(Role.TEACHER);
        if (college == null) {
            teacher.setAccountStatus(UserStatus.ACTIVE);
        } else {
            teacher.setAccountStatus(UserStatus.PENDING);
        }
        teacher.setCollege(college);
        userRepository.save(teacher);
    }
    
    @Transactional
    public boolean verifyUser(LoginRequestDTO dto) {
    	User userEntity = userRepository.findByUsername(dto.getUsername())
    			.orElse(null);
    	return passwordEncoder.matches(dto.getPassword(), userEntity.getPasswordHash());
    }
}
