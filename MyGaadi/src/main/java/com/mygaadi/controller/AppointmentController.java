package com.mygaadi.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mygaadi.custom_exceptions.DuplicateAppointmentException;
import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.AppointmentRequestDTO;
import com.mygaadi.entities.User;
import com.mygaadi.security.JwtUtil;
import com.mygaadi.service.AppointmentService;
import com.mygaadi.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/appointment")
@AllArgsConstructor
public class AppointmentController {
	
	private final UserService userService;
	
	private final JwtUtil jwtUtil;
	
	private final AppointmentService appointmentservice;
	
	@PostMapping("/{carId}")
	public ResponseEntity<?> addAppointment
	(@PathVariable Long carId,
			@RequestHeader("Authorization") String authHeader,
			@RequestBody AppointmentRequestDTO message) throws IOException, DuplicateAppointmentException
	{
		 String token = authHeader.substring(7);
	        String email = jwtUtil.extractEmail(token);

	     
		String msg = message.getMessage();
	        User user = userService.getUserByEmail(email);

		
		return ResponseEntity.ok(appointmentservice.addAppointment(user	, carId ,msg));
		
	}

}
