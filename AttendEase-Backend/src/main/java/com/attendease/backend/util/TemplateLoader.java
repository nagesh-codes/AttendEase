package com.attendease.backend.util;

import java.nio.charset.StandardCharsets;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

@Component
public class TemplateLoader{
	public String loadTemplate(String templateName) {
		try {
			ClassPathResource resource = new ClassPathResource("mail_templates/"+templateName+".html");
			byte[] binaryData = FileCopyUtils.copyToByteArray(resource.getInputStream());
			return new String(binaryData,StandardCharsets.UTF_8);
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException("Could not load the template"+templateName+e);
		}
	}
}