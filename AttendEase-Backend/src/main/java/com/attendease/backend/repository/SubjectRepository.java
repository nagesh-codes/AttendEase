package com.attendease.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.attendease.backend.entity.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long>{

	@Query("SELECT s.name FROM Subject s WHERE s.classes.id = :classId")
	List<String> findByClassId(@Param("classId") Long classId);
	
	@Query("SELECT s FROM Subject s WHERE s.classes.id = :classId")
	List<Subject> findByClass_Id(@Param("classId") Long classId);
}