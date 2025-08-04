package com.mygaadi.service;

import com.mygaadi.dao.CarDao;
import com.mygaadi.dao.FavoriteDao;
import com.mygaadi.dao.UserDao;
import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.entities.Car;
import com.mygaadi.entities.Favorite;
import com.mygaadi.entities.User;
import com.mygaadi.custom_exceptions.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired private FavoriteDao favoriteDao;
    @Autowired private CarDao carDao;
    @Autowired private UserDao userDao;
    @Autowired private ModelMapper mapper;

    @Override
    public List<CarResponseDTO> getUserFavorites(Long userId) {
        userDao.findById(userId)
               .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return favoriteDao.findByUserId(userId).stream()
            .map(fav -> mapper.map(fav.getCar(), CarResponseDTO.class))
            .collect(Collectors.toList());
    }
    
    @Override
    public void addFavorite(Long userId, Long carId) {
        if (favoriteDao.existsByUser_IdAndCar_CarId(userId, carId)) return;

        User user = userDao.findById(userId)
                          .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Car car = carDao.findById(carId)
                        .orElseThrow(() -> new ResourceNotFoundException("Car not found"));

        Favorite fav = new Favorite();
        fav.setUser(user);
        fav.setCar(car);
        fav.setCreatedAt(LocalDateTime.now());
        favoriteDao.save(fav);
    }

    @Override
    public void removeFavorite(Long userId, Long carId) {
        favoriteDao.deleteByUser_IdAndCar_CarId(userId, carId);
    }
    
   
}
