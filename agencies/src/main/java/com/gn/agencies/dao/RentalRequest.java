package com.gn.agencies.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RentalRequest {
    private Long carId;
    private Long customerId;
    private String licenseNumber;
}

