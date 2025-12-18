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
        College college = collegeRepository.findById(dto.getCollegeId())
                .orElseThrow(() -> new RuntimeException("College not found"));

        // 2️⃣ Create User entity
        User teacher = new User();
        teacher.setName(dto.getName());
        teacher.setUsername(dto.getUsername());
        teacher.setEmail(dto.getEmail());

        // 3️⃣ Hash password
        teacher.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        // 4️⃣ Set role & status
        teacher.setRole(Role.TEACHER);
        teacher.setAccountStatus(UserStatus.PENDING);

        // 5️⃣ Set college (FK handled automatically)
        teacher.setCollege(college);

        // 6️⃣ Save teacher
        userRepository.save(teacher);
    }
}
