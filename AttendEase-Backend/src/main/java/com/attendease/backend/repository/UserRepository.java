package com.attendease.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.attendease.backend.entity.User;
import com.attendease.backend.entity.UserStatus;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findById(Long id);
    
    @Query("SELECT u FROM User u WHERE u.accountStatus = :status AND u.college.id = :collegeId")
    List<User> findByStatusAndCollegeId(
        @Param("status") UserStatus status, 
        @Param("collegeId") Long collegeId
    );

}
