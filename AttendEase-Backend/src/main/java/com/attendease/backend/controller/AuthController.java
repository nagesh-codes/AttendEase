package com.attendease.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.attendease.backend.dto.SignupRequest;
import com.attendease.backend.dto.TeacherSignupRequestDto;
import com.attendease.backend.dto.UserResponse;
import com.attendease.backend.entity.User;
import com.attendease.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupTeacher(@RequestBody TeacherSignupRequestDto dto) {
        userService.registerTeacher(dto);
        return ResponseEntity.ok("Signup request submitted for approval");
    }
    
}
