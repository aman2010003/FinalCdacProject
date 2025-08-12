package com.mygaadi.service;

import java.util.List;

import org.springframework.http.ProblemDetail;

import com.mygaadi.dto.AdminResponseDTO;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.entities.User;

public interface AdminService {
	
	public List<AdminResponseDTO> getAllUsersData();

	public ApiResponse deleteById(Long id);

}
