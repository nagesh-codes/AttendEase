package com.attendease.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.attendease.backend.dto.LoginRequest;
import com.attendease.backend.dto.SignupRequest;
import com.attendease.backend.dto.UserResponse;
import com.attendease.backend.entity.User;
import com.attendease.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            User created = userService.registerNewUser(request);
            UserResponse resp = new UserResponse(created.getId(), created.getUsername(),
                created.getEmail());
            return ResponseEntity.status(201).body(resp);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            if(userService.login(request)) {
            	
//            UserResponse resp = new UserResponse(created.getId(), created.getUsername(), created.getEmail());
            return ResponseEntity.status(201).body("success");
            }
            return ResponseEntity.badRequest().body("fail to login");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }
}
