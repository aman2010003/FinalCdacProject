package com.mygaadi.dto;

import com.mygaadi.entities.UserStatus;
import com.mygaadi.entities.UserType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNo;
    private String token;
    private UserType type;
    private UserStatus status;
    
}