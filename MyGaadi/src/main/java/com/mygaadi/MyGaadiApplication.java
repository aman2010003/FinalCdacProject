package com.mygaadi;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MyGaadiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyGaadiApplication.class, args);
	}

}
