package com.attendease.backend.repository;

import com.attendease.backend.entity.College;
import com.attendease.backend.entity.CollegeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {
    List<College> findByStatus(CollegeStatus status);
}
