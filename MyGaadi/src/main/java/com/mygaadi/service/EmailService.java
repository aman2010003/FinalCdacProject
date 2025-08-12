package com.mygaadi.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import com.mygaadi.dao.CarDao;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.AppointmentRequestDTO;
import com.mygaadi.entities.Car;
import com.mygaadi.entities.User;

import lombok.AllArgsConstructor;



@Service
@Transactional
@AllArgsConstructor
public class EmailService {
	
	private final JavaMailSender mailSender;
	private final CarDao carDao;

	
	@Async
    public void sendSellerEmail(AppointmentRequestDTO dto, Long carId) {
        SimpleMailMessage message = new SimpleMailMessage();
        Car car = carDao.findById(carId).orElseThrow(()->new ResourceNotFoundException("Car not found"));
        System.out.println(car.getSeller().getEmail());
        message.setTo(car.getSeller().getEmail());
        message.setSubject("Incoming Appointment Request");
        message.setText(
        	    "Dear User,\n\n" +
        	    "Your Car : " + car.getBrand()+" "+car.getModel() + " has been successfully booked for an appointment.\n\n" +
        	    "Appointment Details:\n" +
        	    "Location       : " + dto.getLocation() + "\n" +
        	    "Date           : " + dto.getAppointmentDate() + "\n" +
        	    "Time           : " + dto.getAppointmentTime() + "\n\n" +
        	    "Please log in to your account to respond to this request.\n\n" +
        	    "Thank you,\n" +
        	    "MyGaadi Team"
        	);
      try {
            mailSender.send(message);
        } catch (Exception e) {
            
            System.err.println("Failed to send OTP: " + e.getMessage());
        }
      
    }
    
    @Async
    public void sendBuyerEmail(String email, Long carId)
    {
    	SimpleMailMessage message = new SimpleMailMessage();
    	  Car car = carDao.findById(carId).orElseThrow(()->new ResourceNotFoundException("Car not found"));
          message.setTo(email);
          message.setSubject("Car Appointment Booking");
          message.setText(
        		    "Dear User,\n\n" +
        		    "Thank you for booking the car: " + car.getBrand() + " " + car.getModel() + ".\n\n" +
        		    "Seller Details:\n" +
        		    "Name     : " + car.getSeller().getName() + "\n" +
        		    "Email    : " + car.getSeller().getEmail() + "\n" +
        		    "Phone No : " + car.getSeller().getPhoneNo() + "\n\n" +
        		    "We appreciate your trust in MyGaadi.\n\n" +
        		    "Best regards,\n" +
        		    "The MyGaadi Team"
        		);
          try {
              mailSender.send(message);
          } catch (Exception e) {
              
              System.err.println("Failed to send OTP: " + e.getMessage());
          }
        

    }

}
