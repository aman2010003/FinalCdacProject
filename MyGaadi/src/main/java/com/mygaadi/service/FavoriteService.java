package com.mygaadi.service;

import com.mygaadi.dto.CarResponseDTO;
import java.util.List;

public interface FavoriteService {
    List<CarResponseDTO> getUserFavorites(Long userId);
    void addFavorite(Long userId, Long carId);
}
