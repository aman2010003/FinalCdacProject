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
import com.mygaadi.entities.UserStatus;
import com.mygaadi.specification.CarSpecification;

import jakarta.transaction.Transactional;

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
        List<Car> cars = carDao.findAllBySellerStatus(UserStatus.ACTIVE);
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
    
    @Override
    public CarResponseDTO getCarById(Long id) {
        Car car = carDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Car not found with ID " + id));
        
        List<Image> images = imageDao.findAllByCar_CarId(car.getCarId());
        
    	List<CarImageDTO> newimages = new ArrayList<>();
    	
        CarResponseDTO newcar =	modelMapper.map(car, CarResponseDTO.class);
        
        for (Image image : images) {
            CarImageDTO dto = new CarImageDTO();
            dto.setImagebase64(Base64.getEncoder().encodeToString(image.getImage()));
            newimages.add(dto);
        }

        newcar.setImages(newimages);
        
        return newcar;
    }
    
    @Override
    public List<CarResponseDTO> getCarsBySellerId(Long sellerId) {
        List<Car> cars = carDao.findBySellerId(sellerId);
        
        List<CarResponseDTO> responseList = new ArrayList<>();

        for (Car car : cars) {
            List<Image> images = imageDao.findAllByCar_CarId(car.getCarId());

            List<CarImageDTO> imageDTOs = images.stream()
                .map(img -> {
                    CarImageDTO dto = new CarImageDTO();
                    dto.setImagebase64(Base64.getEncoder().encodeToString(img.getImage()));
                    return dto;
                }).collect(Collectors.toList());

            CarResponseDTO dto = modelMapper.map(car, CarResponseDTO.class);
            dto.setImages(imageDTOs);

            responseList.add(dto);
        }

        return responseList;
    }
    

	@Override
	public ApiResponse deleteCarById(Long id) {
		Car car = carDao.findById(id)
		.orElseThrow(() -> new ResourceNotFoundException("Car not found with ID " + id));
		 List<Image> list = imageDao.findAllByCar_CarId(car.getCarId());
		car.deleteImage(list);
		carDao.deleteById(id);
		return new ApiResponse("car was deleted");
	}
	


@Override
@Transactional
public CarResponseDTO updateCar(Long id, CarRequestDTO dto, MultipartFile[] images, Long sellerId) {
    Car car = carDao.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Car not found with ID: " + id));

    // ✅ Optional: Validate seller ownership
    if (!car.getSeller().getId().equals(sellerId)) {
        throw new RuntimeException("Unauthorized: You do not own this car.");
    }

    // Update car fields
    car.setBrand(dto.getBrand());
    car.setModel(dto.getModel());
    car.setRegistrationYear(dto.getRegistrationYear());
    car.setOwnership(dto.getOwnership());
    car.setKmDriven(dto.getKmDriven());
    car.setLocation(dto.getLocation());
    car.setRegistrationNumber(dto.getRegistrationNumber());
    car.setColor(dto.getColor());
    car.setInsuranceValid(dto.isInsuranceValid());
    car.setFuelType(dto.getFuelType());
    car.setTransmission(dto.getTransmission());
    car.setPrice(dto.getPrice());

    // Replace images if new ones provided
    if (images != null && images.length > 0) {
        List<Image> oldImages = imageDao.findAllByCar_CarId(car.getCarId());
        imageDao.deleteAll(oldImages);

        List<Image> newImages = new ArrayList<>();
        try {
            for (MultipartFile file : images) {
                Image image = new Image();
                image.setCar(car);
                image.setImage(file.getBytes());
                newImages.add(image);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error processing image file", e);
        }

        car.setList(newImages);
    }

    Car saved = carDao.save(car);

    // Convert to DTO with base64 images
    List<Image> savedImages = imageDao.findAllByCar_CarId(saved.getCarId());
    List<CarImageDTO> imageDTOs = savedImages.stream()
        .map(img -> {
            CarImageDTO dtoImg = new CarImageDTO();
            dtoImg.setImagebase64(Base64.getEncoder().encodeToString(img.getImage()));
            return dtoImg;
        }).collect(Collectors.toList());

    CarResponseDTO response = modelMapper.map(saved, CarResponseDTO.class);
    response.setImages(imageDTOs);

    return response;
}

}