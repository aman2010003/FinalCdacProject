package com.mygaadi.service;



import com.mygaadi.dao.CarDao;
import com.mygaadi.dao.InquiryDao;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.dto.InquiryRequestDTO;
import com.mygaadi.entities.Car;
import com.mygaadi.entities.Inquiry;
import com.mygaadi.entities.User;
import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class InquiryServiceImpl implements InquiryService {
    @Autowired private InquiryDao inquiryDao;
    @Autowired private UserDao userDao;
    @Autowired private CarDao carDao;

    @Override
    public ApiResponse sendInquiry(InquiryRequestDTO dto) {
        User from = userDao.findById(dto.getFromUserId())
                           .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        
        Car car = carDao.findById(dto.getCarId())
                        .orElseThrow(() -> new ResourceNotFoundException("Car not found"));
        
        User seller = userDao.findById(car.getSeller().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Inquiry inq = new Inquiry();
        inq.setFromUserId(dto.getFromUserId());
        inq.setToSellerId(car.getSeller().getId());
        inq.setCarId(dto.getCarId());
        inq.setMessage(dto.getMessage());
        inq.setCreatedAt(LocalDateTime.now());
//        inquiryDao.save(inq);
        
        return new ApiResponse("Name : "+seller.getName()+" , Email : "+seller.getEmail()+" , Phone : "+seller.getPhoneNo());
    }
}