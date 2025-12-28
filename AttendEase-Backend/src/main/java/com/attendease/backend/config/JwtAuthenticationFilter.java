package com.attendease.backend.config;

import com.attendease.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final SecurityFilterChain filterChain;
	@Autowired
	private JwtService jwtService;

	JwtAuthenticationFilter(SecurityFilterChain filterChain) {
		this.filterChain = filterChain;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String authHeader = request.getHeader("Authorization");
	    final String jwt;
	    final String subject; 

	    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	        filterChain.doFilter(request, response);
	        return;
	    }

	    jwt = authHeader.substring(7);
	    
	    // 1. Extract Subject ("SYSTEM_ADMIN")
	    try {
	        subject = jwtService.extractSubject(jwt); 
	    } catch (Exception e) {
	        filterChain.doFilter(request, response); // Invalid token signature
	        return;
	    }

	    if (subject != null && SecurityContextHolder.getContext().getAuthentication() == null) {

	        // --- LOGIC SPLIT ---

	        // CASE 1: SYSTEM ADMIN (No User DB Check)
	        if ("SYSTEM_ADMIN".equals(subject)) {
	            
	            // We ONLY check the signature validation here.
	            // We do NOT check the database because Admin is Env-based.
	            if (jwtService.isTokenValid(jwt)) {
	                
	                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
	                        "SYSTEM_ADMIN",
	                        null,
	                        Collections.singletonList(new SimpleGrantedAuthority("SYSTEM_ADMIN"))
	                );
	                
	                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	                SecurityContextHolder.getContext().setAuthentication(authToken);
	            }

	        // CASE 2: REGULAR USERS (Check User DB)
	        } else {
	            // For normal users (Colleges, Students), we MUST check if they still exist in DB
//	            UserDetails userDetails = this.userDetailsService.loadUserByUsername(subject);
//	            
//	            if (jwtService.isTokenValid(jwt)) { 
//	                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//	                        userDetails,
//	                        null,
//	                        userDetails.getAuthorities()
//	                );
//	                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//	                SecurityContextHolder.getContext().setAuthentication(authToken);
//	            }
	        }
	    }

	    filterChain.doFilter(request, response);
	}
}