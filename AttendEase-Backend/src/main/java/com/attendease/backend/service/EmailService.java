package com.attendease.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String body) {
    	try {
    		System.out.println(toEmail);
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
			helper.setFrom("${Email}");
			helper.setTo(toEmail);
			helper.setSubject(subject);
			helper.setText(body,true);
			
			mailSender.send(message);
			System.out.println("Mail Sent successfully...");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();			
		}
        
    }
    
    
}