package com.gn.agencies.controller;

import com.gn.agencies.DTO.CarRentalStatusDTO;
import com.gn.agencies.DTO.PaymentRequestDTO;
import com.gn.agencies.DTO.RentalDetailsDTO;
import com.gn.agencies.DTO.RentalUpdateDTO;
import com.gn.agencies.dao.RentalRequest;
import com.gn.agencies.entity.Car;
import com.gn.agencies.entity.Customer;
import com.gn.agencies.entity.Rental;
import com.gn.agencies.repository.CarRepository;
import com.gn.agencies.repository.CustomerRepository;
import com.gn.agencies.repository.RentalRepository;
import com.gn.agencies.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rentals")
public class RentalController {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private RentalService rentalService;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public Rental createRental(@RequestBody RentalRequest rentalRequest) {
        Car car = carRepository.findById(rentalRequest.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found with ID: " + rentalRequest.getCarId()));

        Customer customer = customerRepository.findById(rentalRequest.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + rentalRequest.getCustomerId()));

        Rental rental = new Rental();
        rental.setCar(car);
        rental.setCustomer(customer);
        rental.setStartTime(LocalDateTime.now());
        rental.setTotalAmount(0.0);
        rental.setLicenseNumber(rentalRequest.getLicenseNumber());// Default, can be updated later

        return rentalRepository.save(rental);
    }
    @GetMapping("/total-rentals")
    public long getTotalRentals() {
        return rentalService.getTotalActiveRentals();
    }

    // Endpoint to fetch all current rentals
    @GetMapping("/current")
    public ResponseEntity<List<Rental>> getCurrentRentals(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Rental> rentalPage = rentalRepository.findAll(pageable);

        // Convert to List and return
        return ResponseEntity.ok(rentalPage.getContent());
    }

    // Endpoint to fetch all available cars
    @GetMapping("/available-cars")
    public List<Car> getAvailableCars() {
        return rentalService.getAvailableCars();
    }

    @GetMapping("/active")
    public ResponseEntity<?> getActiveRentalsByCustomerId(@RequestParam Long customerId) {
        try {
            List<RentalDetailsDTO> activeRentals = rentalService.getActiveRentalDetails(customerId);
            if (!activeRentals.isEmpty()) {
                return ResponseEntity.ok(activeRentals);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No active rentals found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching active rentals: " + e.getMessage());
        }
    }
    @GetMapping("/check-active")
    public ResponseEntity<CarRentalStatusDTO> checkActiveRental(@RequestParam Long carId) {
        try {
            // Check if the car has an active rental where endTime is null
            Optional<Rental> activeRental = rentalRepository.findByCarIdAndEndTimeIsNull(carId);

            // Return CarRentalStatusDTO with isBooked = true if rental exists
            if (activeRental.isPresent()) {
                return ResponseEntity.ok(new CarRentalStatusDTO(carId, true));
            }

            // Return CarRentalStatusDTO with isBooked = false if no active rental exists
            return ResponseEntity.ok(new CarRentalStatusDTO(carId, false));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/update")
    public ResponseEntity<String> updateRental(@RequestBody RentalUpdateDTO rentalUpdateDTO) {
        try {
            System.out.println("Rental Update Request Received: " + rentalUpdateDTO);

            Rental updatedRental = rentalService.updateRental(
                    rentalUpdateDTO.getCarId(),
                    rentalUpdateDTO.getCustomerId(),
                    rentalUpdateDTO.getTotalAmount(),
                    LocalDateTime.parse(rentalUpdateDTO.getEndTime(), DateTimeFormatter.ISO_DATE_TIME)
            );

            return ResponseEntity.ok("Rental updated successfully. Rental ID: " + updatedRental.getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update rental: " + e.getMessage());
        }
    }
    @GetMapping("/rental-history/{customerId}")
    public ResponseEntity<List<Car>> getRentalHistory(@PathVariable Long customerId) {
        try {
            // Fetch all rentals for the given customer where endTime is not null
            List<Rental> rentals = rentalRepository.findByCustomerIdAndEndTimeIsNotNull(customerId);

            if (rentals.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // Fetch car details for each rental
            List<Car> cars = rentals.stream()
                    .map(rental -> carRepository.findById(rental.getCar().getId())
                            .orElse(null)) // Handle cases where car might be missing
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(cars);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }
    @GetMapping("/most-booked-car/{customerId}")
    public ResponseEntity<Car> getMostBookedCarForCustomer(@PathVariable Long customerId) {
        Car mostBookedCar = rentalService.getMostBookedCarByCustomer(customerId);
        return ResponseEntity.ok(mostBookedCar);
    }

}
