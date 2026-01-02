package com.attendease.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.attendease.backend.entity.User;
import com.attendease.backend.entity.UserStatus;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    Optional<User> findByaccountStatusAndCollege_Id(UserStatus status, Long collegeId);

    // boolean login()
}
