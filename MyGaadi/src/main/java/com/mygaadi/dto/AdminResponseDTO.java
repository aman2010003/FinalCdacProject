package com.mygaadi.dto;

import java.time.LocalDate;

import com.mygaadi.entities.UserStatus;
import com.mygaadi.entities.UserType;

import lombok.Data;

@Data
public class AdminResponseDTO {
	
	private int id;
	private String name;
	private String email;
	private String phoneNo;
	private String password;
	private UserType type;
	private LocalDate createdAt;
	private UserStatus status;
	
}
