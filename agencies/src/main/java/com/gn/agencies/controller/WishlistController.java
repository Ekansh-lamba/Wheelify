package com.gn.agencies.controller;

import com.gn.agencies.DTO.WishlistDTO;
import com.gn.agencies.entity.Car;
import com.gn.agencies.entity.Customer;
import com.gn.agencies.entity.Wishlist;
import com.gn.agencies.repository.CarRepository;
import com.gn.agencies.repository.CustomerRepository;
import com.gn.agencies.repository.WishlistRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<?> addToWishlist(@RequestBody WishlistDTO wishlistDTO) {
        try {
            // Retrieve Customer object
            Customer customer = customerRepository.findById(wishlistDTO.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));

            // Retrieve Car object
            Car car = carRepository.findById(wishlistDTO.getCarId())
                    .orElseThrow(() -> new RuntimeException("Car not found"));

            // Create Wishlist object
            Wishlist wishlist = new Wishlist();
            wishlist.setCustomer(customer);
            wishlist.setCar(car);

            // Save Wishlist entry
            wishlistRepository.save(wishlist);

            return ResponseEntity.ok("Car added to wishlist!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getWishlistByCustomer(@RequestParam Long customerId) {
        try {
            List<Wishlist> wishlist = wishlistRepository.findByCustomerId(customerId);
            List<Car> cars = wishlist.stream()
                    .map(w -> carRepository.findById(w.getCar().getId())
                            .map(car -> {
                                Hibernate.initialize(car); // Force initialization
                                return car;
                            }).orElse(null))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(cars);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

}

