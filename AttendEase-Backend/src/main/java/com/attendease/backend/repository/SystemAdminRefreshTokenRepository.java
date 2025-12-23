package com.attendease.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.attendease.backend.entity.SystemAdminRefreshTokens;

@Repository
public interface SystemAdminRefreshTokenRepository extends JpaRepository<SystemAdminRefreshTokens, Long> {
	
	Optional<SystemAdminRefreshTokens> findByTokenAndRevokedFalse(String tokenhash);
}