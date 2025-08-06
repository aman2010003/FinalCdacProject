package com.mygaadi.dto;

import com.mygaadi.entities.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
public class AppointmentResponseDTO {

    private Long id;

    private String buyerName;
    private String buyerEmail;

    private String sellerName;
    private String sellerEmail;

    private String carBrand;
    private String carModel;
    private String carVariant;

    // Appointment Info
    private String location;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private LocalDateTime createdAt;
    private AppointmentType type;
    private AppointmentStatus status;
}
