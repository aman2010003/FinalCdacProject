package com.mygaadi.controller;

import com.mygaadi.dto.CarResponseDTO;
import com.mygaadi.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    @Autowired private FavoriteService favoriteService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CarResponseDTO>> get(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.getUserFavorites(userId));
    }

  
}
