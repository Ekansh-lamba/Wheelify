package com.gn.agencies.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RentalDetailsDTO {

    private long carId;
    private String carName;
    private String carBrand;
    private LocalDateTime startTime;
    private double totalAmount;
    private long elapsedTime;

    // Constructor
    public RentalDetailsDTO(long carId, String carName, String carBrand, LocalDateTime startTime,long elapsedTime, double totalAmount) {
        this.carId=carId;
        this.carName = carName;
        this.carBrand = carBrand;
        this.startTime = startTime;
        this.totalAmount = totalAmount;
        this.elapsedTime = elapsedTime;
    }

   }
