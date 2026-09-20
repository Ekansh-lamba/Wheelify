package com.gn.agencies.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customer_location")
public class CustomerLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Establish a relationship with the Customer entity
    @JoinColumn(name = "customer_id", nullable = false) // Maps customer_id to Customer table's primary key
    private Customer customer;

    @Column(name = "latitude", nullable = false, precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false, precision = 11, scale = 8)
    private BigDecimal longitude;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    // Getters and Setters
}
