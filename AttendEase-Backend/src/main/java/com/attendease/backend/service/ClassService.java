package com.attendease.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendease.backend.dto.ClassRequestDTO;
import com.attendease.backend.entity.ClassEntity;
import com.attendease.backend.repository.ClassRepository;
import com.attendease.backend.repository.CollegeRepository;

import jakarta.transaction.Transactional;

@Service
public class ClassService{
	@Autowired
	private ClassRepository classRepository;
	private CollegeRepository collegeRepository;
	private SubjectService subjectService;
	
	public ClassService(ClassRepository classRepository,CollegeRepository collegeRepository,SubjectService subjectService) {
		this.classRepository = classRepository;
		this.collegeRepository = collegeRepository;
		this.subjectService = subjectService;
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
	
	public Map<String, List<String>> getCollegeClass(Long collegeId) {
		Map<String, List<String>> ans = new HashMap<String,List<String>>();
		List<ClassEntity> lce = classRepository.findByCollegeId(collegeId);
		for(ClassEntity ce : lce) {
			List<String> ls = subjectService.getSubjects(ce.getId());
			ans.put(ce.getName(),ls);
		}
		return ans;
	}
}