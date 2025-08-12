package com.mygaadi.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mygaadi.custom_exceptions.AuthenticationFailureException;
import com.mygaadi.custom_exceptions.InvalidInputException;
import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.AuthResponseDTO;
import com.mygaadi.dto.SignInDTO;
import com.mygaadi.dto.SignupReqDTO;
import com.mygaadi.dto.UserDTO;
import com.mygaadi.entities.User;
import com.mygaadi.security.JwtUtil;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Autowired
    public UserServiceImpl(UserDao userDao, ModelMapper modelMapper) {
    	
        this.userDao = userDao;
    	 
    	 
        this.modelMapper = modelMapper;
        
        // Configure ModelMapper if needed
        this.modelMapper.getConfiguration()
            .setFieldMatchingEnabled(true)
            .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);
    }

    
    
    
    
    
    
    //Logic For JWT Token
    
    
    @Autowired
    private JwtUtil jwtUtil; 

    @Override
    public AuthResponseDTO signIn(SignInDTO dto) {
        if (dto.getEmail() == null || dto.getPassword() == null) {
            throw new InvalidInputException("Email and password are required");
        }

        User user = userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
                .orElseThrow(() -> new AuthenticationFailureException("Invalid email or password"));

        UserDTO userDto = modelMapper.map(user, UserDTO.class);
        String token = jwtUtil.generateToken(user);

        return new AuthResponseDTO(userDto, token);
    }


    @Override
    public UserDTO signUp(SignupReqDTO dto) {
        // Validate password match
        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new InvalidInputException("Password and confirm password do not match");
        }
        
        // Check for existing email
        if (userDao.existsByEmail(dto.getEmail())) {
            throw new InvalidInputException("Email already in use");
        }
        
        // Check for existing phone number
        if (userDao.existsByPhoneNo(dto.getPhoneNo())) {
            throw new InvalidInputException("Phone number already in use");
        }
        
        // Map DTO to Entity
        User user = modelMapper.map(dto, User.class);
        
        // Set additional fields if needed
        user.setCreatedAt(java.time.LocalDate.now());
        
        // Save user
        User savedUser = userDao.save(user);
        
        // Map Entity back to DTO for response
        return modelMapper.map(savedUser, UserDTO.class);
    }
    
    // Additional methods can be added here as needed
    
    
    
    
    
    //get user by email
    @Override
    public User getUserByEmail(String email) {
        return userDao.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
    
    
    
    
    //get user By Id
    @Override
    public UserDTO getUserById(Long id) {
        User user = userDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID " + id));
        return modelMapper.map(user, UserDTO.class);
    }
    
    
    
    //Update user by id
    @Override
    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = userDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhoneNo(dto.getPhoneNo());
        user.setStatus(dto.getStatus());
        user.setType(dto.getType());
        User saved = userDao.save(user);
        return modelMapper.map(saved, UserDTO.class);
    }
    
    
    
    //for profile update 
    @Override
    public User updateUser(User user) {
        return userDao.save(user);
    }


}