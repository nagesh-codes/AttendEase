package com.attendease.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Open /api/auth/** so signup can be called without auth
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/colleges/**").permitAll()
                        .requestMatchers("/api/college-application/**").permitAll()
                        .requestMatchers("/api/system-admin/send-otp").permitAll()
                        .requestMatchers("/api/system-admin/verify-otp").permitAll()
                        .requestMatchers("/api/system-admin/refresh-token").permitAll()
                        .requestMatchers("/api/system-admin/**").hasRole("SYSTEM_ADMIN")
                        .anyRequest().authenticated())
                .httpBasic();
        return http.build();
    }
}
