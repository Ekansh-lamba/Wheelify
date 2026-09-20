package com.gn.agencies.controller;

import com.gn.agencies.DTO.RentalStatisticsDTO;
import com.gn.agencies.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminStatisticsController {

    @Autowired
    private RentalService rentalService;

    @GetMapping("/statistics")
    public RentalStatisticsDTO getStatistics() {
        long totalRentals = rentalService.countTotalRentals();
        long availableCars = rentalService.countAvailableCars();
        long currentRentals = rentalService.countCurrentRentals();

        return new RentalStatisticsDTO(totalRentals, availableCars, currentRentals);
    }
}
