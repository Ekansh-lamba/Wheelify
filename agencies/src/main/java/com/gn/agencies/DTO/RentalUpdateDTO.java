package com.gn.agencies.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RentalUpdateDTO {
    private Long carId;
    private Long customerId;
    private Double totalAmount;
    private String endTime; // String to allow parsing from JSON

    // Getters and Setters


    @Override
    public String toString() {
        return "RentalUpdateDTO{" +
                "carId=" + carId +
                ", customerId=" + customerId +
                ", totalAmount=" + totalAmount +
                ", endTime='" + endTime + '\'' +
                '}';
    }
}
