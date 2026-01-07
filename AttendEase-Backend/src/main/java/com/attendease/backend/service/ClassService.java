package com.attendease.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendease.backend.dto.ClassRequestDTO;
import com.attendease.backend.entity.ClassEntity;
import com.attendease.backend.entity.Subject;
import com.attendease.backend.repository.ClassRepository;
import com.attendease.backend.repository.CollegeRepository;
import com.attendease.backend.repository.SubjectRepository;

import jakarta.transaction.Transactional;

@Service
public class ClassService{
	@Autowired
	private ClassRepository classRepository;
	private CollegeRepository collegeRepository;
	private SubjectService subjectService;
	private SubjectRepository subjectRepository;
	
	public ClassService(ClassRepository classRepository,CollegeRepository collegeRepository,SubjectService subjectService,SubjectRepository subjectRepository) {
		this.classRepository = classRepository;
		this.collegeRepository = collegeRepository;
		this.subjectService = subjectService;
		this.subjectRepository = subjectRepository;
	}
	
	@Transactional
	public void addClass(ClassRequestDTO dto) {
		try {
			System.out.println("entered "+dto.getClassName());
			ClassEntity clsEntity = new ClassEntity();
			clsEntity.setCollege(collegeRepository.findById(dto.getCollegeId()).orElse(null));
			clsEntity.setName(dto.getClassName());
//			clsEntity.setOwner();
			classRepository.save(clsEntity);
			System.out.println("data saved");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			throw new RuntimeException("Class Not Saved");
		}
	}
	
	public List<Map<String, Object>> getCollegeClass(Long collegeId) {
	    List<Map<String, Object>> responseList = new ArrayList<>();
	    List<ClassEntity> classes = classRepository.findByCollegeId(collegeId);
	    for (ClassEntity ce : classes) {
	        Map<String, Object> classMap = new HashMap<>();
	        classMap.put("name", ce.getName());
	        classMap.put("id", ce.getId());
	        List<String> subjectNames = subjectRepository.findByClassId(ce.getId());
	        classMap.put("subjects", subjectNames);
	        responseList.add(classMap);
	    }
	    return responseList;
	}
	
	@Transactional
	public void deleteClass(Long classId) {
		List<Subject> subj = subjectRepository.findByClass_Id(classId);
		ClassEntity clsEnt = classRepository.findById(classId).orElseThrow(()->new RuntimeException("class not found"));
		clsEnt.setDeleted(true);
		for(Subject sb : subj) {
			sb.setDeleted(true);
		}
	}
}