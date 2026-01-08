package com.attendease.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.dto.*;
import com.attendease.backend.service.ClassService;
import com.attendease.backend.service.CollegeService;
import com.attendease.backend.service.SubjectService;
import com.attendease.backend.service.UserService;

@RestController
@RequestMapping("/api/college-admin/")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class CollegeAdminController {

    private final SubjectService subjectService;

	private final CollegeService collegeService;
	@Autowired
	private UserService userService;
	private ClassService classService;

	public CollegeAdminController(UserService userService, CollegeService collegeService,ClassService classService, SubjectService subjectService) {
		this.userService = userService;
		this.collegeService = collegeService;
		this.classService = classService;
		this.subjectService = subjectService;
	}

	@GetMapping("/pending-teachers")
	public List<PendingTeachersResponseDTO> pendingTeachers(@RequestParam Long collegeId) {
		return userService.pendingTeachers(collegeId);
	}
	
	@GetMapping("/get-teachers")
	public List<TeacherResponseDTO> getTeacher(@RequestParam Long collegeId){
		return userService.getTeachers(collegeId);
	}
	

	@PatchMapping("/update-teacher-appn")
	public ResponseEntity<?> updateTeacherAppn(@RequestBody UpdateTeacherStatusRequestDTO dto) {
		try {
			userService.updateTeacherAppn(dto);
			return ResponseEntity.ok("changes saved");
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@GetMapping("/get-college-info")
	public GetCollegeInfoResponseDTO getCollegeIngo(@RequestParam Long collegeId) {
		return collegeService.getCollegeInfo(collegeId);
	}
	
	@GetMapping("/get-college-class")
	public List<Map<String, Object>> getCollegeClass(@RequestParam Long collegeId){
		return classService.getCollegeClass(collegeId);
	}
	
	@PostMapping("/add-class")
	public ResponseEntity<?> addClass(@RequestBody ClassRequestDTO dto){
		try {
			classService.addClass(dto);
			return ResponseEntity.ok("Class Saved");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(302).body("Class Not Saved");
		}
	}
	
	@DeleteMapping("/delete-class")
	public ResponseEntity<?> deleteClass(@RequestParam Long classId){
		try {
			classService.deleteClass(classId);
			return ResponseEntity.ok("Class Deleted");
		} catch (Exception e) {
			return ResponseEntity.status(404).body("Class Not Found");
		}
	}
	
	@PostMapping("/add-subject")
	public ResponseEntity<?> addSubject(@RequestBody AddSubjectRequestDTO dto){
		try {
			subjectService.addSubject(dto);
			return ResponseEntity.ok("Subject Added");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.status(404).body("Subject not added/Subject not found");
		}
	}
	
	@DeleteMapping("/delete-subject")
	public ResponseEntity<?> deleteSubject(@RequestParam Long classId,@RequestParam String subjectName){
		try {
			subjectService.deleteSubject(classId,subjectName);
			return ResponseEntity.ok("Subject Deleted");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(404).body("subject not deleted/ not found");
		}
	}
}