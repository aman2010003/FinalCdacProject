package com.mygaadi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.mygaadi.entities.Car;

public interface CarDao extends JpaRepository<Car, Long>, JpaSpecificationExecutor<Car> {
}
