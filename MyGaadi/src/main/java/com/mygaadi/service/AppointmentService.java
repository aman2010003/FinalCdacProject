package com.mygaadi.service;

import com.mygaadi.custom_exceptions.DuplicateAppointmentException;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.entities.User;

public interface AppointmentService {
	
	public ApiResponse addAppointment(User userId,Long sellerId, String msg) throws DuplicateAppointmentException;
	
}
