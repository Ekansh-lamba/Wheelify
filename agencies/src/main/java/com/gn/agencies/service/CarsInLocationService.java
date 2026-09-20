package com.gn.agencies.service;

import com.gn.agencies.entity.CarsInLocation;
import com.gn.agencies.repository.CarsInLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarsInLocationService {

    @Autowired
    private CarsInLocationRepository carsInLocationRepository;

    public CarsInLocation addCarToLocation(CarsInLocation carsInLocation) {
        return carsInLocationRepository.save(carsInLocation);
    }

    public List<CarsInLocation> getAllCarsInLocations() {
        return carsInLocationRepository.findAll();
    }
}
