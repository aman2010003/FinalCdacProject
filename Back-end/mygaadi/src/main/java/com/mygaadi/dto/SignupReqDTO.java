package com.mygaadi.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SignupReqDTO {
    @NotBlank(message = "Name must be supplied")
    private String name;
    
    @NotBlank(message = "Email must be supplied")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Phone number must be supplied")
    @Pattern(regexp="^[0-9]{10}$", message = "Invalid phone number")
    private String phoneNo;
    
    @NotBlank
    @Pattern(regexp="((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
             message = "Password must be 5-20 chars with at least 1 digit, 1 lowercase and 1 special char")
    private String password;
    
    @NotBlank(message = "Confirm password must be supplied")
    private String confirmPassword;
}