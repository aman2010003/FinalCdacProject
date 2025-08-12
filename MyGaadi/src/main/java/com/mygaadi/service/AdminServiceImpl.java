package com.mygaadi.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.AdminResponseDTO;
import com.mygaadi.dto.ApiResponse;
import com.mygaadi.entities.User;
import com.mygaadi.entities.UserStatus;
import com.mygaadi.entities.UserType;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final UserDao userDao;
	private ModelMapper modelMapper;
	
	@Override
	public List<AdminResponseDTO> getAllUsersData() {
		
		List<User> allUsers = userDao.findAllByType(UserType.USER);
		List<AdminResponseDTO> allUsers2 = new ArrayList<>();
		for (User user : allUsers) {
			allUsers2.add(modelMapper.map(user, AdminResponseDTO.class));
		}
		return allUsers2;
	}

	@Override
	public ApiResponse deleteById(Long id) {
		User user = userDao.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found"));
		user.setStatus(UserStatus.INACTIVE);
		userDao.save(user);
		return new ApiResponse("Removed User : "+user.getName());
	}
	
	

}
