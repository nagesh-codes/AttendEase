package com.attendease.backend.service;

import java.security.Key;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService{
	
	private final Key signingKey;
	
	private static final long SYSTEM_ADMIN_TOKEN_EXPIRY = 15 * 60 * 1000;
	private static final long USER_TOKEN_EXPIRY = 60 * 60 * 1000;
	
	public JwtService(@Value("${jwt.secret}") String secret) {
		this.signingKey = Keys.hmacShaKeyFor(secret.getBytes());
	}
	
	public String generateSystemAdminToken() {
		return generateToken(
					"SYSTEM_ADMIN",
					Map.of("role","SYSTEM_ADMIN"),
					SYSTEM_ADMIN_TOKEN_EXPIRY
				);
	}
	
	private String generateToken(String subject,Map<String,Object> claims,long expiryMillis) {
		
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expiryMillis))
				.compact();
	}
	
	public Claims extractClaims(String Token) {
		return Jwts.parserBuilder()
				.setSigningKey(signingKey)
				.build()
				.parseClaimsJws(Token)
				.getBody();
	}
	
	public boolean isTokenValid(String Token) {
		try {
			extractClaims(Token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			// TODO: handle exception
			e.printStackTrace();
			return false;
		}
	}
	
	public String extractRole(String Token) {
		return extractClaims(Token).get("role",String.class);
	}
	
	public String extractSubject(String token) {
		return extractClaims(token).getSubject();
	}
}