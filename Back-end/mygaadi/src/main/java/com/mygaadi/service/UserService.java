package com.mygaadi.service;

import com.mygaadi.dto.SignInDTO;
import com.mygaadi.dto.SignupReqDTO;
import com.mygaadi.dto.UserDTO;

public interface UserService {
    UserDTO signIn(SignInDTO dto);
    UserDTO signUp(SignupReqDTO dto);
    UserDTO getUserById(Long id);
    UserDTO updateUser(Long id, SignupReqDTO dto);
}