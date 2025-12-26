package com.attendease.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.attendease.backend.dto.TeacherSignupRequestDto;
import com.attendease.backend.entity.College;
import com.attendease.backend.entity.Role;
import com.attendease.backend.entity.User;
import com.attendease.backend.entity.UserStatus;
import com.attendease.backend.repository.*;

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

    public void registerTeacher(TeacherSignupRequestDto dto) {

        // 1️⃣ Fetch college entity
        // College college = collegeRepository.findById(dto.getCollegeId())
        // .orElseThrow(() -> new RuntimeException("College not found"));

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
}
