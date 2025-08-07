package com.mygaadi.controller;

import com.mygaadi.entities.User;
import com.mygaadi.security.JwtUtil;
import com.mygaadi.service.UserService;
import com.mygaadi.dao.UserDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDao userDao;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid token");
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        User user = userService.getUserByEmail(email);

        return ResponseEntity.ok(Map.of(
            "name", user.getName(),
            "phone", user.getPhoneNo(),
            "email", user.getEmail()
        ));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> updatedData, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid token");
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }

        String email = jwtUtil.extractEmail(token);
        User user = userService.getUserByEmail(email);

        String newEmail = updatedData.get("email");
        String newPhone = updatedData.get("phone");

        // Optional: uniqueness validation
        if (!user.getEmail().equals(newEmail) && userDao.existsByEmailAndIdNot(newEmail, user.getId())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        if (!user.getPhoneNo().equals(newPhone) && userDao.existsByPhoneNoAndIdNot(newPhone, user.getId())) {
            return ResponseEntity.badRequest().body("Phone number already in use");
        }

        user.setName(updatedData.get("name"));
        user.setPhoneNo(newPhone);
        user.setEmail(newEmail);

        userService.updateUser(user);

        return ResponseEntity.ok("Profile updated successfully");
    }
}
