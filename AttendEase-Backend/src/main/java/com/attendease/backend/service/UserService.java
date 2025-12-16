package com.attendease.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.attendease.backend.entity.User;
import com.attendease.backend.repository.UserRepository;
import com.attendease.backend.dto.LoginRequest;
import com.attendease.backend.dto.SignupRequest;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerNewUser(SignupRequest req) {
        if (req.getUsername() == null || req.getPassword() == null) {
            throw new IllegalArgumentException("username and password are required");
        }
        if (userRepository.existsByUsername(req.getUsername()) || userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalStateException("username already taken");
        }

        String encoded = passwordEncoder.encode(req.getPassword());

        User user = new User(req.getName(),req.getUsername(), req.getEmail(),encoded,req.getRole());
        return userRepository.save(user);
    }
    
    @Transactional
    public boolean login(LoginRequest req) {
        if (req.getEmail() == null || req.getPassword() == null) {
            throw new IllegalArgumentException("Email and password are required");
        }
//        if (userRepository.existsByEmail(req.getEmail()) || userRepository.existsByEmail(req.getEmail())) {
//            throw new IllegalStateException("username already taken");
//        }
        String hashedPassword = userRepository.findByEmail(req.getEmail()).getPassword();
        return passwordEncoder.matches(req.getPassword(), hashedPassword);
    }
}
