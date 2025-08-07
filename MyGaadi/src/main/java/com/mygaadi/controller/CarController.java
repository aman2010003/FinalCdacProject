package com.mygaadi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mygaadi.dto.CarFilterDTO;
import com.mygaadi.dto.CarRequestDTO;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.entities.User;
import com.mygaadi.security.JwtUtil;
import com.mygaadi.service.CarService;
import com.mygaadi.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;

    @Autowired
    private ObjectMapper objectMapper;

    // ✅ Add car with image and JSON
    @PostMapping("/add")
    public ResponseEntity<?> addCarImage(
        @RequestHeader("Authorization") String authHeader,
        @RequestParam("images") MultipartFile[] images,
        @RequestParam("car") String fileData
    ) throws IOException {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        User seller = userService.getUserByEmail(email);
        Long sellerId = seller.getId();

        CarRequestDTO dto = objectMapper.readValue(fileData, CarRequestDTO.class);
        return ResponseEntity.ok(carService.addCar(dto, images, sellerId));
    }

    // ✅ Get all cars
    @GetMapping("/all")
    public ResponseEntity<List<CarResponseDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    // ✅ Filter cars
    @PostMapping("/filter")
    public ResponseEntity<List<CarResponseDTO>> filterCars(@RequestBody CarFilterDTO filter) {
        return ResponseEntity.ok(carService.filterCars(filter));
    }

    // ✅ Get car by ID
    @GetMapping("/{id}")
    public ResponseEntity<CarResponseDTO> getCarById(@PathVariable Long id) {
        return ResponseEntity.ok(carService.getCarById(id));
    }

    // ✅ Get cars posted by authenticated user
    @GetMapping("/my")
    public ResponseEntity<List<CarResponseDTO>> getMyCars(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        Long sellerId = userService.getUserByEmail(email).getId();
        return ResponseEntity.ok(carService.getCarsBySellerId(sellerId));
    }

    // ✅ Delete car by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMyCar(@PathVariable Long id) {
        return ResponseEntity.ok(carService.deleteCarById(id));
    }

    // ✅ Update car by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCar(
        @PathVariable Long id,
        @RequestPart("car") String carJson,
        @RequestPart(value = "images", required = false) MultipartFile[] images,
        @RequestHeader("Authorization") String authHeader
    ) throws IOException {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        Long sellerId = userService.getUserByEmail(email).getId();

        CarRequestDTO carRequestDTO = objectMapper.readValue(carJson, CarRequestDTO.class);

        CarResponseDTO updatedCar = carService.updateCar(id, carRequestDTO, images, sellerId);
        return ResponseEntity.ok(updatedCar);
    }
}
