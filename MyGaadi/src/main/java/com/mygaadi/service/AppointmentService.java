package com.mygaadi.service;

import java.util.List;

import com.mygaadi.custom_exceptions.DuplicateAppointmentException;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.dto.AppointmentRequestDTO;
import com.mygaadi.dto.AppointmentResponseDTO;
import com.mygaadi.entities.AppointmentStatus;
import com.mygaadi.entities.User;

public interface AppointmentService {
	
	public ApiResponse addAppointment(User userId,Long sellerId, AppointmentRequestDTO request) throws DuplicateAppointmentException;

	public List<AppointmentResponseDTO> getAllAppointment();
	
	public List<AppointmentResponseDTO> getAppointmentByUserId(Long userId);
	
	public List<AppointmentResponseDTO> getAppointmentBySellerId(Long userId);

	public ApiResponse updateStatus(Long id, String status);
	
}
