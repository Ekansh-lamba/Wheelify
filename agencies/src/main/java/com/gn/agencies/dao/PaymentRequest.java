package com.gn.agencies.dao;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
    private Long customerId;
    private double amount;
    private String method;
    private Long carId;
    private String licenseNumber;
}
