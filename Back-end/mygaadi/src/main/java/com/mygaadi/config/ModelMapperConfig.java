package com.mygaadi.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mygaadi.dto.CarRequestDTO;
import com.mygaadi.entities.Car;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // ✅ Skip mapping of carId while converting from DTO to Entity
        TypeMap<CarRequestDTO, Car> typeMap = modelMapper.createTypeMap(CarRequestDTO.class, Car.class);
        typeMap.addMappings(mapper -> mapper.skip(Car::setCarId));

        return modelMapper;
    }
}
