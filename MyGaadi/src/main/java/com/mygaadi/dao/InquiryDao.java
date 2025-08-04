package com.mygaadi.dao;

import com.mygaadi.entities.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryDao extends JpaRepository<Inquiry, Long> {}
