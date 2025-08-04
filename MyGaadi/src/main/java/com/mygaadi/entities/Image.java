package com.mygaadi.entities;

import java.util.Base64;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Image {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Lob
	@Column(columnDefinition = "MEDIUMBLOB")
	private byte[] image;
	
	
	public String getImageBase64() {
	    return Base64.getEncoder().encodeToString(this.image);
	}
	@ManyToOne
	@JoinColumn(name = "car_id")
	private Car car;

}
