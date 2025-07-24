package com.mygaadi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mygaadi.dao.CarDao;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.CarFilterDTO;
import com.mygaadi.dto.CarRequestDTO;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.entities.Car;
import com.mygaadi.entities.User;
import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import com.mygaadi.specification.CarSpecification;

import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarDao carDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ModelMapper modelMapper;

    // ✅ Add a new car
    @Override
    public CarResponseDTO addCar(CarRequestDTO dto) {
        User seller = userDao.findById(dto.getSellerId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + dto.getSellerId()));

        Car car = modelMapper.map(dto, Car.class);
        car.setSeller(seller);
        car.setCreatedAt(LocalDateTime.now());

        Car saved = carDao.save(car);
        return modelMapper.map(saved, CarResponseDTO.class);
    }

    // ✅ Fetch all cars
    @Override
    public List<CarResponseDTO> getAllCars() {
        List<Car> cars = carDao.findAll();

        return cars.stream()
                   .map(car -> modelMapper.map(car, CarResponseDTO.class))
                   .collect(Collectors.toList());
    }

    // ✅ Filter/Search cars with sorting by latest first
    @Override
    public List<CarResponseDTO> filterCars(CarFilterDTO filter) {
        List<Car> cars = carDao.findAll(
            CarSpecification.filterBy(filter),
            Sort.by(Sort.Direction.DESC, "createdAt")
        );

        return cars.stream()
                   .map(car -> modelMapper.map(car, CarResponseDTO.class))
                   .collect(Collectors.toList());
    }
    
    @Override
    public CarResponseDTO getCarById(Long id) {
        Car car = carDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Car not found with ID " + id));
        return modelMapper.map(car, CarResponseDTO.class);
    }

}
