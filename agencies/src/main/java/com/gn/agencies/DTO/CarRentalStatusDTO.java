package com.gn.agencies.DTO;

import lombok.Data;

@Data
public class CarRentalStatusDTO {
    private Long carId;
    private boolean isBooked;

    public CarRentalStatusDTO(Long carId, boolean isBooked) {
        this.carId = carId;
        this.isBooked = isBooked;
    }
}