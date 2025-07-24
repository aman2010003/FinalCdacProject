package com.mygaadi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mygaadi.dto.CarFilterDTO;
import com.mygaadi.dto.CarRequestDTO;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.service.CarService;

@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping("/add")
    public ResponseEntity<CarResponseDTO> addCar(@RequestBody CarRequestDTO dto) {
        CarResponseDTO savedCar = carService.addCar(dto);
        return ResponseEntity.ok(savedCar);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<CarResponseDTO>> getAllCars() {
        List<CarResponseDTO> allCars = carService.getAllCars();
        return ResponseEntity.ok(allCars);
    }
    
    @PostMapping("/filter")
    public ResponseEntity<List<CarResponseDTO>> filterCars(@RequestBody CarFilterDTO filter) {
        return ResponseEntity.ok(carService.filterCars(filter));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CarResponseDTO> getCarById(@PathVariable Long id) {
        CarResponseDTO response = carService.getCarById(id);
        return ResponseEntity.ok(response);
    }


}
