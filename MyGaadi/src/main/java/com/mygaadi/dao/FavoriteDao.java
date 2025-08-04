package com.mygaadi.dao;

import com.mygaadi.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteDao extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(Long userId);

    // Corrected property paths using User.id and Car.carId
    boolean existsByUser_IdAndCar_CarId(Long userId, Long carId);

    void deleteByUser_IdAndCar_CarId(Long userId, Long carId);
}
