package com.mygaadi.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mygaadi.dao.CarDao;
import com.mygaadi.dao.ImageDao;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.dto.CarFilterDTO;
import com.mygaadi.dto.CarImageDTO;
import com.mygaadi.dto.CarRequestDTO;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.entities.Car;
import com.mygaadi.entities.Image;
import com.mygaadi.entities.User;
import com.mygaadi.mapper.CarMapper;
import com.mygaadi.specification.CarSpecification;
import com.mygaadi.custom_exceptions.ResourceNotFoundException;

import org.modelmapper.ModelMapper;

import java.io.Console;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarDao carDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private ImageDao imageDao;
   

    @Override
    public CarResponseDTO addCar(CarRequestDTO dto, MultipartFile[] files, Long sellerId) {
        try {
            User seller = userDao.findById(sellerId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID " + sellerId));

            Car car = modelMapper.map(dto, Car.class);
            car.setSeller(seller);
            car.setCreatedAt(LocalDateTime.now());
            car.setList(new ArrayList<>());

            for (MultipartFile file : files) {
                Image image = new Image();
                image.setCar(car);
                image.setImage(file.getBytes()); // this can throw IOException
                car.getList().add(image);
            }

            Car saved = carDao.save(car);
            return modelMapper.map(saved, CarResponseDTO.class);
            
        } catch (IOException e) {
            throw new RuntimeException("Error processing image file", e);
        }
    }
}