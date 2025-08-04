package com.mygaadi.controller;

import com.mygaadi.entities.User;
import com.mygaadi.security.JwtUtil;
import com.mygaadi.service.UserService;

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

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid token");
        }

        String token = authHeader.substring(7); // remove "Bearer "
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
}
