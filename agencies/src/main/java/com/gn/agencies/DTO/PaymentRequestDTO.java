package com.gn.agencies.DTO;

import lombok.Data;

@Data
public class PaymentRequestDTO {
    private Long customerId;
    private Long carId;
    private double totalAmount;
    private String paymentMethod;
    private String licenseNumber;
}

