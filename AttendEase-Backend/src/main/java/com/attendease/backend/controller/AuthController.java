package com.attendease.backend.controller;

import java.util.Collections;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.attendease.backend.dto.TeacherSignupRequestDto;
import com.attendease.backend.repository.UserRepository;
import com.attendease.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    public AuthController(UserService userService,UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupTeacher(@RequestBody TeacherSignupRequestDto dto) {
        userService.registerTeacher(dto);
        return ResponseEntity.ok("Signup request submitted for approval");
    }
    
    @PostMapping("/checkUsername")
    public ResponseEntity<?> checkUsername(@RequestBody UsernameCheckRequest req){
    	boolean exists = userRepository.existsByUsername(req.getUsername());
    	return ResponseEntity.ok(Collections.singletonMap("exists", exists));
    }
    
    @PostMapping("/checkEmail")
    public ResponseEntity<?> checkEmail(@RequestBody EmailCheckRequest req){
    	boolean exists = userRepository.existsByEmail(req.getEmail());
    	return ResponseEntity.ok(Collections.singletonMap("exists", exists));
    }
    
    static class UsernameCheckRequest{
    	private String username;
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
    }
    
    static class EmailCheckRequest {
        private String email;
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
    }
}
