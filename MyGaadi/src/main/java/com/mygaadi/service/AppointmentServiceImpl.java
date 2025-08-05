package com.mygaadi.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.mygaadi.custom_exceptions.DuplicateAppointmentException;
import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import com.mygaadi.dao.AppointmentDao;
import com.mygaadi.dao.CarDao;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.dto.AppointmentRequestDTO;
import com.mygaadi.dto.AppointmentResponseDTO;
import com.mygaadi.entities.AppointmentStatus;
import com.mygaadi.entities.Appointment;
import com.mygaadi.entities.Car;
import com.mygaadi.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

	private final UserDao userDao;
	
	private final CarDao carDao;
	
	private final AppointmentDao appointmentDao;
	
	@Override
	public ApiResponse addAppointment(User user, Long carId, AppointmentRequestDTO request) throws DuplicateAppointmentException {
		
		Car car =carDao.findById(carId).orElseThrow(()->new ResourceNotFoundException("Invalid carId"));
		 User seller = car.getSeller();
		 
		 if (user.getId().equals(seller.getId())) {
		        throw new IllegalArgumentException("Buyer and seller cannot be the same user.");
		    }	 
		Appointment appointment = new Appointment();
		appointment.setCar(car);
		appointment.setBuyer(user);;
		appointment.setSeller(seller);
		appointment.setAppointmentDate(request.getAppointmentDate());
		appointment.setAppointmentTime(request.getAppointmentTime());
		appointment.setLocation(request.getLocation());
		appointment.setType(request.getType());
		appointment.setStatus(AppointmentStatus.PENDING);
		appointment.setCreatedAt(LocalDateTime.now());
		try {
		    appointmentDao.save(appointment);
		} catch (DataIntegrityViolationException ex) {
		    throw new DuplicateAppointmentException("Appointment already exists");
		}

		return new ApiResponse("Appointment was Added Successfully BuyerID :"+user.getId()+" sellerId :"+seller.getId());
	}

	@Override
	public List<AppointmentResponseDTO> getAllAppointment() {
		List<Appointment> list = appointmentDao.findAll();
		List<AppointmentResponseDTO> newlist = new ArrayList<>();

		for (Appointment appointment : list) {
		    AppointmentResponseDTO dto = AppointmentResponseDTO.builder()
		        .id(appointment.getId())
		        
		        
		        .buyerName(appointment.getBuyer().getName())
		        .buyerEmail(appointment.getBuyer().getEmail())

		       
		        .sellerName(appointment.getSeller().getName())
		        .sellerEmail(appointment.getSeller().getEmail())

		      
		        .carBrand(appointment.getCar().getBrand())
		        .carModel(appointment.getCar().getModel())
		        .carVariant(appointment.getCar().getVariant())

		        // Appointment details
		        .location(appointment.getLocation())
		        .appointmentDate(appointment.getAppointmentDate())
		        .appointmentTime(appointment.getAppointmentTime())
		        .createdAt(appointment.getCreatedAt())
		        .type(appointment.getType())
		        .status(appointment.getStatus())

		        .build();

		    newlist.add(dto);
		}

		return newlist;
	}

	@Override
	public List<AppointmentResponseDTO> getAppointmentByUserId(Long userId) {
		List<Appointment> byBuyer_Id = appointmentDao.findByBuyer_Id(userId);
		List<AppointmentResponseDTO> newlist = new ArrayList<>();

		for (Appointment appointment : byBuyer_Id) {
		    AppointmentResponseDTO dto = AppointmentResponseDTO.builder()
		        .id(appointment.getId())
		        
		        
		        .buyerName(appointment.getBuyer().getName())
		        .buyerEmail(appointment.getBuyer().getEmail())

		       
		        .sellerName(appointment.getSeller().getName())
		        .sellerEmail(appointment.getSeller().getEmail())

		      
		        .carBrand(appointment.getCar().getBrand())
		        .carModel(appointment.getCar().getModel())
		        .carVariant(appointment.getCar().getVariant())

		        // Appointment details
		        .location(appointment.getLocation())
		        .appointmentDate(appointment.getAppointmentDate())
		        .appointmentTime(appointment.getAppointmentTime())
		        .createdAt(appointment.getCreatedAt())
		        .type(appointment.getType())
		        .status(appointment.getStatus())

		        .build();
		

		    newlist.add(dto);
		}
		return newlist;
	}

	@Override
	public List<AppointmentResponseDTO> getAppointmentBySellerId(Long sellerId) {
		List<Appointment> bySellerId = appointmentDao.findBySeller_Id(sellerId);
		List<AppointmentResponseDTO> newlist = new ArrayList<>();

		for (Appointment appointment : bySellerId) {
		    AppointmentResponseDTO dto = AppointmentResponseDTO.builder()
		        .id(appointment.getId())
		        
		        
		        .buyerName(appointment.getBuyer().getName())
		        .buyerEmail(appointment.getBuyer().getEmail())

		       
		        .sellerName(appointment.getSeller().getName())
		        .sellerEmail(appointment.getSeller().getEmail())

		      
		        .carBrand(appointment.getCar().getBrand())
		        .carModel(appointment.getCar().getModel())
		        .carVariant(appointment.getCar().getVariant())

		        // Appointment details
		        .location(appointment.getLocation())
		        .appointmentDate(appointment.getAppointmentDate())
		        .appointmentTime(appointment.getAppointmentTime())
		        .createdAt(appointment.getCreatedAt())
		        .type(appointment.getType())
		        .status(appointment.getStatus())

		        .build();
		

		    newlist.add(dto);
		}
		return newlist;
	}

	@Override
	public ApiResponse updateStatus(Long id, String status) {
		Appointment appmnt = appointmentDao.findById(id).orElseThrow(()->new ResourceNotFoundException("Appointment not found"));
		
		appmnt.setStatus(AppointmentStatus.valueOf(status));
		return new ApiResponse(appmnt.getId()+" was updated successfully");
	}

}
