package com.gn.agencies.controller;

import com.gn.agencies.DTO.CarsInLocationDTO;
import com.gn.agencies.entity.Car;
import com.gn.agencies.entity.CarsInLocation;
import com.gn.agencies.entity.Location;
import com.gn.agencies.repository.CarRepository;
import com.gn.agencies.repository.CarsInLocationRepository;
import com.gn.agencies.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars-in-location")
public class CarsInLocationController {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CarsInLocationRepository carsInLocationRepository;

    @PostMapping
    public ResponseEntity<?> addCarsInLocation(@RequestBody CarsInLocationDTO carsInLocationDTO) {
        Location location = locationRepository.findById(carsInLocationDTO.getLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        for (Long carId : carsInLocationDTO.getCarIds()) {
            Car car = carRepository.findById(carId)
                    .orElseThrow(() -> new RuntimeException("Car not found"));

            CarsInLocation carsInLocation = new CarsInLocation();
            carsInLocation.setLocation(location);
            carsInLocation.setCar(car);

            carsInLocationRepository.save(carsInLocation);
        }

        return ResponseEntity.ok("Cars added to the location successfully!");
    }

    @GetMapping
    public ResponseEntity<List<CarsInLocation>> getAllCarsInLocations() {
        return ResponseEntity.ok(carsInLocationRepository.findAll());
    }
}
