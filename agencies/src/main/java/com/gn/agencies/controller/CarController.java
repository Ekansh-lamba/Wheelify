package com.gn.agencies.controller;

import com.gn.agencies.entity.Car;
import com.gn.agencies.repository.CarRepository;
import com.gn.agencies.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "http://localhost:3000")
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private CarRepository carRepository;

    // Get all cars
    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    // Get a car by ID
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with ID: " + id));
    }

    // Add a new car
    @PostMapping
    public Car saveCar(@RequestBody Car car) {
        return carService.saveCar(car);
    }

    // Delete a car by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable Long id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
            return ResponseEntity.ok("Car has been removed successfully!"); // Return success message
        } else {
            return ResponseEntity.status(404).body("Car not found with ID: " + id); // Return error message
        }
    }

    // Update car details
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car updatedCar) {
        return carRepository.findById(id)
                .map(car -> {
                    car.setName(updatedCar.getName());
                    car.setCarBrand(updatedCar.getCarBrand());
                    car.setCarRegistrationNumber(updatedCar.getCarRegistrationNumber());
                    car.setCarColor(updatedCar.getCarColor());
                    car.setCarType(updatedCar.getCarType());
                    carRepository.save(car);
                    return ResponseEntity.ok(car); // Return updated car
                })
                .orElse(ResponseEntity.notFound().build()); // Return 404 if car not found
    }

    @PutMapping("/{id}/upload-picture")
    public ResponseEntity<?> uploadPicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            Car car = carRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Car not found"));

            car.setPicture(file.getBytes());
            carRepository.save(car);

            return ResponseEntity.ok("Picture uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading picture: " + e.getMessage());
        }
    }
    @GetMapping("/{id}/picture")
    public ResponseEntity<byte[]> getPicture(@PathVariable Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        if (car.getPicture() != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(car.getPicture());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/add-with-picture")
    public ResponseEntity<?> addCarWithPicture(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("hourlyRate") double hourlyRate,
            @RequestParam("carBrand") String carBrand,
            @RequestParam("carRegistrationNumber") String carRegistrationNumber,
            @RequestParam("carColor") String carColor,
            @RequestParam("carType") String carType) {
        try {
            Car car = new Car();
            car.setName(name);
            car.setHourlyRate(hourlyRate);
            car.setCarBrand(carBrand);
            car.setCarRegistrationNumber(carRegistrationNumber);
            car.setCarColor(carColor);
            car.setCarType(carType);
            car.setPicture(file.getBytes()); // Save the picture in the 'picture' column
            carRepository.save(car);

            return ResponseEntity.ok("Car added successfully with picture!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding car: " + e.getMessage());
        }
    }
}
