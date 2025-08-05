package com.mygaadi.service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.mygaadi.custom_exceptions.DuplicateAppointmentException;
import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import com.mygaadi.dao.AppointmentDao;
import com.mygaadi.dao.CarDao;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.dto.AppointmentRequestDTO;
import com.mygaadi.entities.AppoinmentStatus;
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
		appointment.setStatus(AppoinmentStatus.PENDING);
		appointment.setCreatedAt(LocalDateTime.now());
		try {
		    appointmentDao.save(appointment);
		} catch (DataIntegrityViolationException ex) {
		    throw new DuplicateAppointmentException("Appointment already exists");
		}

		return new ApiResponse("Appointment was Added Successfully BuyerID :"+user.getId()+" sellerId :"+seller.getId());
	}

}
