package com.mygaadi.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mygaadi.entities.Appointment;

public interface AppointmentDao extends JpaRepository<Appointment, Long>{

	List<Appointment> findByBuyer_Id(Long userId);
	
	List<Appointment> findBySeller_Id(Long sellerId);

}
