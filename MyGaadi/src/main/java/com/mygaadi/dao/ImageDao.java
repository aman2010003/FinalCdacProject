package com.mygaadi.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mygaadi.entities.Image;

public interface ImageDao extends JpaRepository<Image, Long>{

	List<Image> findAllById(Long Id);

	
	List<Image> findAllByCar_CarId(Long carId);


}
