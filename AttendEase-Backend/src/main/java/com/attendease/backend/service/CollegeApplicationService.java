package com.attendease.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.attendease.backend.dto.CollegeApplicationRequestDTO;
import com.attendease.backend.dto.CollegeApplicationResponseDTO;
import com.attendease.backend.entity.CollegeApplication;
import com.attendease.backend.entity.CollegeApplicationStatus;
import com.attendease.backend.repository.CollegeApplicationRepository;
import java.util.List;
@Service
public class CollegeApplicationService{
	
	private CollegeApplicationRepository collegeApplicationRespository;
	private EmailService emailService;
	
	public CollegeApplicationService(CollegeApplicationRepository collegeApplicationRepository,EmailService emailService) {
		this.collegeApplicationRespository = collegeApplicationRepository;
		this.emailService = emailService;
	}
	
	@Transactional
	public void addCollegeApllication(CollegeApplicationRequestDTO dto) {
		CollegeApplication clgApp = new CollegeApplication();
		
		clgApp.setCollegeName(dto.getCollegeName());
		clgApp.setAuthorityName(dto.getAuthorityName());
		clgApp.setAuthorityRole(dto.getAuthorityRole());
		clgApp.setOfficialEmail(dto.getOfficialEmail());
		clgApp.setStatus(CollegeApplicationStatus.PENDING);
		
		collegeApplicationRespository.saveAndFlush(clgApp);
		
		String text = "<!DOCTYPE html>\r\n"
				+ "<html>\r\n"
				+ "<head>\r\n"
				+ "    <meta charset=\"UTF-8\">\r\n"
				+ "    <title>AttendEase - College Application</title>\r\n"
				+ "</head>\r\n"
				+ "<body style=\"margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8;\">\r\n"
				+ "\r\n"
				+ "    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\r\n"
				+ "        <tr>\r\n"
				+ "            <td align=\"center\" style=\"padding: 30px 0;\">\r\n"
				+ "                <table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:#ffffff; border-radius:8px; overflow:hidden;\">\r\n"
				+ "\r\n"
				+ "                    <!-- Header -->\r\n"
				+ "                    <tr>\r\n"
				+ "                        <td align=\"center\" style=\"background-color:#1abc9c; padding:20px;\">\r\n"
				+ "                            <h1 style=\"color:#ffffff; margin:0;\">AttendEase</h1>\r\n"
				+ "                            <p style=\"color:#eafff9; margin:5px 0 0;\">Attendance Made Easy</p>\r\n"
				+ "                        </td>\r\n"
				+ "                    </tr>\r\n"
				+ "\r\n"
				+ "                    <!-- Content -->\r\n"
				+ "                    <tr>\r\n"
				+ "                        <td style=\"padding:30px; color:#333333;\">\r\n"
				+ "                            <h2 style=\"color:#1abc9c;\">Application Submitted Successfully</h2>\r\n"
				+ "\r\n"
				+ "                            <p>Dear Applicant,</p>\r\n"
				+ "\r\n"
				+ "                            <p>\r\n"
				+ "                                Thank you for submitting your request to add your college to the\r\n"
				+ "                                <strong>AttendEase</strong> platform.\r\n"
				+ "                            </p>\r\n"
				+ "\r\n"
				+ "                            <p>\r\n"
				+ "                                We have successfully received your application and it is currently\r\n"
				+ "                                under review by our system administration team. All submitted details\r\n"
				+ "                                will be carefully verified to ensure accuracy and authenticity.\r\n"
				+ "                            </p>\r\n"
				+ "\r\n"
				+ "                            <p>\r\n"
				+ "                                Once the review process is completed, you will be notified via this\r\n"
				+ "                                email regarding the approval status of your application. If any\r\n"
				+ "                                additional information or clarification is required, our team will\r\n"
				+ "                                contact you using the details you provided.\r\n"
				+ "                            </p>\r\n"
				+ "\r\n"
				+ "                            <p>\r\n"
				+ "                                We appreciate your interest in AttendEase and your initiative to adopt\r\n"
				+ "                                a digital attendance management solution for your institution.\r\n"
				+ "                            </p>\r\n"
				+ "\r\n"
				+ "                            <p style=\"margin-top:30px;\">\r\n"
				+ "                                Warm regards,<br>\r\n"
				+ "                                <strong>AttendEase Team</strong>\r\n"
				+ "                            </p>\r\n"
				+ "                        </td>\r\n"
				+ "                    </tr>\r\n"
				+ "\r\n"
				+ "                    <!-- Footer -->\r\n"
				+ "                    <tr>\r\n"
				+ "                        <td align=\"center\" style=\"background-color:#f0f0f0; padding:15px; font-size:12px; color:#777777;\">\r\n"
				+ "                            © 2025 AttendEase. All rights reserved.\r\n"
				+ "                        </td>\r\n"
				+ "                    </tr>\r\n"
				+ "\r\n"
				+ "                </table>\r\n"
				+ "            </td>\r\n"
				+ "        </tr>\r\n"
				+ "    </table>\r\n"
				+ "\r\n"
				+ "</body>\r\n"
				+ "</html>\r\n"
				+ "";
		emailService.sendSimpleEmail(dto.getOfficialEmail(), "College Application Submitted Successfully – AttendEase\r\n",text);
	}
	
	public List<CollegeApplicationResponseDTO> getAllPendingCollegeApplication(){
		return collegeApplicationRespository.findByStatus(CollegeApplicationStatus.PENDING)
				.stream()
				.map(c -> new CollegeApplicationResponseDTO(c.getId(),c.getCollegeName(),c.getAuthorityName(),c.getAuthorityRole(),c.getOfficialEmail(),c.getCreatedAt()))
				.toList();
	}
}