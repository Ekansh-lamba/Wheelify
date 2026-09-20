package com.gn.agencies.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RentalStatisticsDTO {
    private long totalRentals;
    private long availableCars;
    private long currentRentals;

}