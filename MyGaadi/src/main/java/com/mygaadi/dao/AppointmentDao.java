package com.mygaadi.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mygaadi.entities.Appointment;

public interface AppointmentDao extends JpaRepository<Appointment, Long>{

	
}
