package com.attendease.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.attendease.backend.entity.ClassEntity;

@Repository
public interface ClassRepository extends JpaRepository<ClassEntity, Long>{
	List<ClassEntity> findByCollegeId(Long collegeId);
	Optional<ClassEntity> findById(Long classId);
}