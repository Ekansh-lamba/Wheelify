package com.gn.agencies.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "payments")
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount", nullable = false)
    private double amount;

    @Column(name =  "method")
    private String method;

    @Column(name = "car_id")
    private Long carId;

    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false) // Customer ID as a column
    private Customer customer;

    @Column(name = "license_number")
    private String licenseNumber;
}
