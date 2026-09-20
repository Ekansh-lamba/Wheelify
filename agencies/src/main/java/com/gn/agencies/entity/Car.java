
package com.gn.agencies.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Car")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "hourly_rate", nullable = false)
    private double hourlyRate;

    @Column(name = "car_brand")
    private String carBrand;

    @Column(name = "car_registration_number")
    private String carRegistrationNumber;

    @Column(name = "car_color")
    private String carColor;

    @Column(name = "car_type")
    private String carType;

    @Column(name = "car_style")
    private String carStyle;

    @Column(name = "picture", columnDefinition = "LONGBLOB")
    private byte[] picture;

    public void orElseThrow(Object o) {
    }
}
