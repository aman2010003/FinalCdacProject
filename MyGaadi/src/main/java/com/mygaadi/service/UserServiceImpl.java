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
        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponseDTO(userDto, token);
    }

	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserDTO getUserById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}



  
    
 

}