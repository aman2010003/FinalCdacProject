package com.mygaadi.controller;

import com.mygaadi.dto.AuthResponseDTO;
import com.mygaadi.dto.SignInDTO;
import com.mygaadi.dto.UserDTO;
import com.mygaadi.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<AuthResponseDTO> userSignIn(@RequestBody SignInDTO dto) {
        AuthResponseDTO response = userService.signIn(dto);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO<UserDTO>> signupUser(@RequestBody @Valid SignupReqDTO dto) {
        UserDTO userDto = userService.signUp(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDTO<>("success", userDto)); 
    }
    

   
    
    
}
