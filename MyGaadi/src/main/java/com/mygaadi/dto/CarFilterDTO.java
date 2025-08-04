package com.mygaadi.dto;

import com.mygaadi.entities.Ownership;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarFilterDTO {
    private String brand;
    private String location;
    private String fuelType;
    private Ownership ownership;
    private Integer minYear;
    private Integer maxYear;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
