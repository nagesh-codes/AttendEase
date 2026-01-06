package com.attendease.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.attendease.backend.repository.SubjectRepository;

@Service
public class SubjectService{
	
	private SubjectRepository subjectRepository;
	
	public SubjectService(SubjectRepository subjectRepository) {
		this.subjectRepository = subjectRepository;
	}
	
	public List<String> getSubjects(Long classId){
		return subjectRepository.findByClassesId(classId);
	}
}