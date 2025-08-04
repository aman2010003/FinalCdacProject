package com.mygaadi.dto;

import com.mygaadi.entities.Ownership;
import lombok.*;

import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CarResponseDTO {
    private Long carId;
    private String brand;
    private String model;
    private String variant;
    private int registrationYear;
    private Ownership ownership;
    private int kmDriven;
    private String location;
    private BigDecimal price;
    private String registrationNumber;
    private String color;
    private boolean insuranceValid;
    private String fuelType;
    private String transmission;
    private String description;
    private LocalDateTime createdAt;
    private List<CarImageDTO> images;

	public void setImages(List<CarImageDTO> imageDTOs)
	{
	System.out.println("fetched");
	this.images = imageDTOs;

	}
}
