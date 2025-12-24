package com.attendease.backend.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.springframework.stereotype.Component;

@Component
public class HashUtil{
	public static String sha256(String value) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] hashBytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));
			
			StringBuilder hexString = new StringBuilder();
			for(byte b:hashBytes) {
				String hex = Integer.toHexString(0xff & b);
				if(hex.length() == 1) {
					hexString.append('0');
				}
				hexString.append(hex);
			}
			return hexString.toString();
		} catch (Exception e) {
			 throw new RuntimeException("Error hashing value", e);
		}
	}
}