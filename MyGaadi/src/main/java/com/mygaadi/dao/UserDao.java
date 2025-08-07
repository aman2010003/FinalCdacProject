package com.mygaadi.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mygaadi.entities.User;

public interface UserDao extends JpaRepository<User, Long> {
  
    // Get user by email
    Optional<User> findByEmail(String email);

    // Used for login
    Optional<User> findByEmailAndPassword(String email, String password);

    // Check if email exists
    boolean existsByEmail(String email);

    // Check if phone exists
    boolean existsByPhoneNo(String phoneNo);

    // ✅ Check if email exists for other users (exclude current user)
    boolean existsByEmailAndIdNot(String email, Long id);

    // ✅ Check if phone exists for other users (exclude current user)
    boolean existsByPhoneNoAndIdNot(String phoneNo, Long id);
}
