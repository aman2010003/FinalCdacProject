package com.mygaadi.mapper;

import com.mygaadi.dto.CarImageDTO;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.entities.Car;
import com.mygaadi.entities.Image;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class CarMapper {

    public static CarResponseDTO toDto(Car car) {
        if (car == null) return null;

        CarResponseDTO dto = new CarResponseDTO();

        // Set basic car details
        dto.setCarId(car.getCarId());
        dto.setBrand(car.getBrand());
        dto.setModel(car.getModel());
        dto.setVariant(car.getVariant());
        dto.setRegistrationYear(car.getRegistrationYear());
        dto.setOwnership(car.getOwnership());
        dto.setKmDriven(car.getKmDriven());
        dto.setLocation(car.getLocation());
        dto.setPrice(car.getPrice());
        dto.setRegistrationNumber(car.getRegistrationNumber());
        dto.setColor(car.getColor());
        dto.setInsuranceValid(car.isInsuranceValid());
        dto.setFuelType(car.getFuelType());
        dto.setTransmission(car.getTransmission());
        dto.setDescription(car.getDescription());
        dto.setCreatedAt(car.getCreatedAt());

        // Map images to DTO
        if (car.getList() != null && !car.getList().isEmpty()) {
            List<CarImageDTO> imageDTOs = car.getList().stream()
                .map(image -> {
                    CarImageDTO dtoImg = new CarImageDTO();
                    if (image.getImage() != null) {
                        try {
                            String base64 = Base64.getEncoder().encodeToString(image.getImage());
                            dtoImg.setImagebase64(base64);
                    
                        } catch (Exception e) {
                            dtoImg.setImagebase64(null);
                        }
                    }
                    return dtoImg;
                })
                .collect(Collectors.toList());
            dto.setImages(imageDTOs);
        }

        return dto;
    }
}
