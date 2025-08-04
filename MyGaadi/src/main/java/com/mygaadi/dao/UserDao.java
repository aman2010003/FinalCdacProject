package com.mygaadi.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mygaadi.entities.User;

public interface UserDao extends JpaRepository<User, Long> {
  
    // Custom method to find user by email
    Optional<User> findByEmail(String email);

    // Already present?
    Optional<User> findByEmailAndPassword(String email, String password);

    // Check if email exists
    boolean existsByEmail(String email);

    // Check if phone exists
    boolean existsByPhoneNo(String phoneNo);
}