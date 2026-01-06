package com.attendease.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.attendease.backend.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long>{
	List<String> findByClassesId(Long classId);
}