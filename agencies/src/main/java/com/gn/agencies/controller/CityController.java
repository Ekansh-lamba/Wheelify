package com.gn.agencies.controller;

import com.gn.agencies.entity.City;
import com.gn.agencies.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cities")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from frontend
public class CityController{

    @Autowired
    private CityRepository cityRepository;

    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        System.out.println("Fetching all cities...");
        List<City> cities = cityRepository.findAll();
        System.out.println("Cities fetched: " + cities);
        return ResponseEntity.ok(cities);
    }


    @GetMapping("/search")
    public ResponseEntity<List<City>> searchCities(@RequestParam(value = "cityName", required = false) String cityName) {
        List<City> cities;
        if (cityName == null || cityName.isEmpty()) {
            cities = cityRepository.findAll(); // Fetch all cities
        } else {
            cities = cityRepository.findByCityNameContainingIgnoreCase(cityName); // Partial match
        }
        return ResponseEntity.ok(cities);
    }

    @PostMapping
    public ResponseEntity<City> addCity(@RequestBody City city) {
        city.setNoOfLocations(0);
        City savedCity = cityRepository.save(city);
        return ResponseEntity.ok(savedCity);
    }

}
