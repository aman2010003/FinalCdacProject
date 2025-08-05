package com.mygaadi.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.mygaadi.entities.AppointmentType;

import lombok.Data;

@Data
public class AppointmentRequestDTO {
	
	
    private String location;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private AppointmentType type;

}
