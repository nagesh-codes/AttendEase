package com.attendease.backend.repository;

import org.springframework.stereotype.Repository;
import com.attendease.backend.entity.SystemAdminOtp;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface SystemAdminOtpRepository extends JpaRepository<SystemAdminOtp,Long>{
	Optional<SystemAdminOtp> findByRefId(String RefId);
}