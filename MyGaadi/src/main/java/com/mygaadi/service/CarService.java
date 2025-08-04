package com.mygaadi.service;



import org.springframework.web.multipart.MultipartFile;


import com.mygaadi.dto.CarRequestDTO;
import com.mygaadi.dto.CarResponseDTO;



public interface CarService {
	CarResponseDTO addCar(CarRequestDTO dto, MultipartFile[] images, Long sellerId);
}