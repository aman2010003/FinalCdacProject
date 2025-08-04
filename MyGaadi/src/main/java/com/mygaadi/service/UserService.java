package com.mygaadi.service;

import com.mygaadi.dto.AuthResponseDTO;
import com.mygaadi.dto.SignInDTO;
import com.mygaadi.dto.SignupReqDTO;
import com.mygaadi.dto.UserDTO;
import com.mygaadi.entities.User;

import jakarta.validation.Valid;

public interface UserService {
	AuthResponseDTO signIn(SignInDTO dto);
	UserDTO signUp(SignupReqDTO dto);
    User getUserByEmail(String email);
    UserDTO getUserById(Long id);
    UserDTO updateUser(Long id, SignupReqDTO dto);
    
	
    

}