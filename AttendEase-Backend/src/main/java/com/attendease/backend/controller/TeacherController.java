package com.attendease.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.attendease.backend.service.ClassService;

 @RestController
 @RequestMapping("/api/teacher")
 @CrossOrigin(origins = "${FRONTEND_URL}")
 public class TeacherController{
	 @Autowired
	 private ClassService classService;
	 
	 @GetMapping("/get-stream-data")
	 public List<Map<String, Object>> getStreamData(@RequestParam Long collegeId,@RequestParam Long teacherId){
		 return classService.getStreamData(collegeId,teacherId);
	 }
 }