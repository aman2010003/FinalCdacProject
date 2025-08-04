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
    
    @PostMapping("/add")
   
    public ResponseEntity<?> addCarImage(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam("images") MultipartFile[] images,
            @RequestParam("car") String fileData) throws IOException {

        // Extract JWT and email
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        // Get seller ID using email
        User seller = userService.getUserByEmail(email);  // Already implemented
        Long sellerId = seller.getId();                  // Get ID from User entity


        // Map car data
        CarRequestDTO dto = objectMapper.readValue(fileData, CarRequestDTO.class);

        // Save car with extracted sellerId
        return ResponseEntity.ok(carService.addCar(dto, images, sellerId));
    }
    

    @GetMapping("/all")
    public ResponseEntity<List<CarResponseDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }
    
    @PostMapping("/filter")
    public ResponseEntity<List<CarResponseDTO>> filterCars(@RequestBody CarFilterDTO filter) {
        return ResponseEntity.ok(carService.filterCars(filter));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CarResponseDTO> getCarById(@PathVariable Long id) {
        return ResponseEntity.ok(carService.getCarById(id));
    }
    
    @GetMapping("/my")
    public ResponseEntity<List<CarResponseDTO>> getMyCars(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        Long sellerId = userService.getUserByEmail(email).getId();
        return ResponseEntity.ok(carService.getCarsBySellerId(sellerId));
    }
}