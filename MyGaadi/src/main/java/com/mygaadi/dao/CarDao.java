package com.mygaadi.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mygaadi.entities.Car;
import com.mygaadi.entities.UserStatus;

public interface CarDao extends JpaRepository<Car, Long>, JpaSpecificationExecutor<Car> {
    List<Car> findBySellerId(Long sellerId); // ✅
    
    @Query("SELECT c FROM Car c WHERE c.seller.id = :sellerId AND c.seller.status = :status")
    List<Car> findBySellerIdAndSellerStatus(@Param("sellerId") Long sellerId, @Param("status") UserStatus status);
    
    @Query("SELECT c FROM Car c WHERE c.seller.status = :status")
    List<Car> findAllBySellerStatus(@Param("status") UserStatus status);


}
