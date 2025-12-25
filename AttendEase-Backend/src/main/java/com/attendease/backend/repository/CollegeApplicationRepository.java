package com.attendease.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.attendease.backend.entity.CollegeApplication;
import com.attendease.backend.entity.CollegeApplicationStatus;


@Repository
public interface CollegeApplicationRepository extends JpaRepository<CollegeApplication, Long>{
	
	List<CollegeApplication> findByStatusOrderByCreatedAtDesc(CollegeApplicationStatus status);
	Optional<CollegeApplication> findById(Long id);
}