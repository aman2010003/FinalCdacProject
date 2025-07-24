package com.mygaadi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mygaadi.dto.SignInDTO;
import com.mygaadi.dto.SignupReqDTO;
import com.mygaadi.dto.UserDTO;
import com.mygaadi.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping("/signin")
    @Operation(description = "User sign in")
    public ResponseEntity<UserDTO> userSignIn(@RequestBody SignInDTO dto) {
        UserDTO userDto = userService.signIn(dto);
        return ResponseEntity.ok(userDto);
    }
    
    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signupUser(@RequestBody @Valid SignupReqDTO dto) {
        UserDTO userDto = userService.signUp(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody SignupReqDTO dto) {
        return ResponseEntity.ok(userService.updateUser(id, dto));
    }



}