package com.mygaadi.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cars")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    private String brand;
    private String model;
    private String variant;
    private int registrationYear;

    @Enumerated(EnumType.STRING)
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
}
