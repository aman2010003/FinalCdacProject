package com.mygaadi.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mygaadi.entities.User;

public interface UserDao extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndPassword(String email, String password);
    boolean existsByEmail(String email);
    boolean existsByPhoneNo(String phoneNo);
}