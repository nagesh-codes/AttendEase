package com.attendease.backend.service;

import org.springframework.stereotype.Service;

import com.attendease.backend.dto.AddSubjectRequestDTO;
import com.attendease.backend.entity.Subject;
import com.attendease.backend.repository.ClassRepository;
import com.attendease.backend.repository.SubjectRepository;

@Service
public class SubjectService{
	private SubjectRepository subjectRepository;
	private ClassRepository classRepository;
	
	public SubjectService(SubjectRepository subjectRepository,ClassRepository classRepository) {
		this.subjectRepository = subjectRepository;
		this.classRepository = classRepository;
	}
	
	public void deleteSubject(Long classId,String subjectName) {
		Subject subjEntity = subjectRepository.findByClassIdAndSubjectName(classId, subjectName)
				.orElseThrow(()->new RuntimeException("subject not found"));
		subjEntity.setDeleted(true);
		subjectRepository.save(subjEntity);
	}
	
	public void addSubject(AddSubjectRequestDTO dto) {
		Subject subEntity;
		subEntity = subjectRepository.findByClassIdAndSubjectName(dto.getClassId(),dto.getSubjectName()).orElse(null);
		if(subEntity == null) {
			subEntity = new Subject();
			subEntity.setClasses(classRepository.findById(dto.getClassId()).orElseThrow(()->new RuntimeException("class not found")));
			subEntity.setName(dto.getSubjectName());
		}else {
			subEntity.setDeleted(false);
		}
		subjectRepository.save(subEntity);
	}
}