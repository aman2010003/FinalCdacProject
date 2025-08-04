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
    
    @Override
    public List<CarResponseDTO> getAllCars() {
        List<Car> cars = carDao.findAll();
        List<Image> images = imageDao.findAll();

        return cars.stream().map(car -> {
            // Map base car details
            CarResponseDTO carDto = modelMapper.map(car, CarResponseDTO.class);

            // Filter images for this car
            List<CarImageDTO> imageDTOs = images.stream()
                .filter(img -> img.getCar().getCarId().equals(car.getCarId()))
                .map(img -> {
                    CarImageDTO dto = new CarImageDTO();
                    dto.setImagebase64(Base64.getEncoder().encodeToString(img.getImage()));
                    return dto;
                })
                .collect(Collectors.toList());

            carDto.setImages(imageDTOs);

            return carDto;
        }).collect(Collectors.toList());
    }
    
    
    @Override
    public List<CarResponseDTO> filterCars(CarFilterDTO filter) {
        List<Car> cars = carDao.findAll(
            CarSpecification.filterBy(filter),
            Sort.by(Sort.Direction.DESC, "createdAt")
        );
        
        List<CarResponseDTO> responseList = new ArrayList<>();

        
        for (Car car : cars) {
        	
        	  List<Image> list = imageDao.findAllByCar_CarId(car.getCarId());
        	  
        		List<CarImageDTO> newimages = new ArrayList<>();
        		
                for (Image image : list) {
                    CarImageDTO dto = new CarImageDTO();
                    dto.setImagebase64(Base64.getEncoder().encodeToString(image.getImage()));
                    newimages.add(dto);
                }
                

                CarResponseDTO newcar =	modelMapper.map(car, CarResponseDTO.class);
                 newcar.setImages(newimages);  
                 
                 responseList.add(newcar);
             }

             return responseList;
    }
}