package com.mygaadi.service;



import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.mygaadi.dto.CarFilterDTO;
import com.mygaadi.dto.CarRequestDTO;
import com.mygaadi.dto.CarResponseDTO;



public interface CarService {
	CarResponseDTO addCar(CarRequestDTO dto, MultipartFile[] images, Long sellerId);
    List<CarResponseDTO> getAllCars();
    List<CarResponseDTO> filterCars(CarFilterDTO filter);
}
