package com.attendease.backend.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.attendease.backend.dto.ClassRequestDTO;
import com.attendease.backend.dto.StudentDTO;
import com.attendease.backend.entity.ClassEntity;
import com.attendease.backend.entity.College;
import com.attendease.backend.entity.Student;
import com.attendease.backend.repository.ClassRepository;
import com.attendease.backend.repository.CollegeRepository;
import com.attendease.backend.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class StudentService{

    private final StudentRepository studentRepository;
    private final ClassRepository classRepository;
    private final CollegeRepository collegeRepository;
    
	public StudentService(ClassRepository classRepository,CollegeRepository collegeRepository,StudentRepository studentRepository) {
		this.classRepository = classRepository;
		this.collegeRepository = collegeRepository;
		this.studentRepository = studentRepository;
	}
	
	@Transactional
	public void addClassStudents(long classId,ClassRequestDTO dto) {
//		List<Student> std = new ArrayList<>();
		ClassEntity clsEnt = classRepository.findByCollegeIdAndName(dto.getCollegeId(), dto.getClassName()).orElseThrow(()->new RuntimeException("class not found"));
		College clgEnt = collegeRepository.findById(dto.getCollegeId()).orElseThrow(()->new RuntimeException("college not found"));
		
		List<Student> savedStudent = new ArrayList<Student>();
		
		for(StudentDTO std:dto.getStudents()) {
			Student st = new Student();
			st.setName(std.name());
			st.setEmail(std.email());
			st.setMobileNumber(std.phone());
			st.setRollNumber(std.roll());
			st.setClassEntity(clsEnt);
			st.setCollege(clgEnt);
			
			savedStudent.add(st);
		}
		
		studentRepository.saveAll(savedStudent);
	}
}