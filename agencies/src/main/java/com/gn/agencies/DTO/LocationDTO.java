package com.gn.agencies.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationDTO {
    private Long id;
    private Long cityId;
    private String locationName;
    private String address;
    private String area;
    private String landmark;
    private String state;
    private String pincode;
    private String latitude;
    private String longitude;
}
