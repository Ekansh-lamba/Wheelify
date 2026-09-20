package com.gn.agencies.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerLocationDTO {

    private Long customerId;
    private BigDecimal latitude;
    private BigDecimal longitude;

    // Getters and Setters
}
