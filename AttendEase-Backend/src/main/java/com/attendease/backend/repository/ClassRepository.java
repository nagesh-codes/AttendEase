package com.attendease.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.attendease.backend.entity.ClassEntity;

@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Long>{
	List<ClassEntity> findByCollegeId(Long collegeId);
	
	@Query("SELECT DISTINCT c FROM ClassEntity c LEFT JOIN FETCH c.subjects WHERE c.college_id = :collegeId")
	List<ClassEntity> findClassesWithSubjects(@Param("collegeId") Long collegeId);
}