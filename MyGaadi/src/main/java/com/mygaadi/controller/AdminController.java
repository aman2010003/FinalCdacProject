package com.mygaadi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mygaadi.security.JwtUtil;
import com.mygaadi.service.AdminService;
import com.mygaadi.service.AppointmentService;
import com.mygaadi.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
	
	private final AdminService adminService;
	private final JwtUtil jwtUtil;
	
	@GetMapping("/")
	public ResponseEntity<?> getAllUsers()
	{
		 Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		    System.out.println("User: " + auth.getName()); // user email
		    System.out.println("Roles: " + auth.getAuthorities()); 
		return ResponseEntity.ok(adminService.getAllUsersData());
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUsers(@PathVariable Long id){
		return ResponseEntity.ok(adminService.deleteById(id));
		
	}

}
