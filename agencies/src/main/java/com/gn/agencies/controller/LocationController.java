package com.gn.agencies.controller;

import com.gn.agencies.DTO.LocationDTO;
import com.gn.agencies.entity.City;
import com.gn.agencies.entity.Location;
import com.gn.agencies.repository.CityRepository;
import com.gn.agencies.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private CityRepository cityRepository;

    @GetMapping
    public ResponseEntity<?> getAllLocations(
            @RequestParam(value = "cityId", required = false) Long cityId,
            @RequestParam(value = "search", required = false) String search) {

        List<Location> locations;

        if (cityId != null) {
            // Filter locations by city ID
            locations = locationRepository.findByCityId(cityId);
        } else if (search != null && !search.isEmpty()) {
            // Search locations by name, area, or landmark
            locations = locationRepository.findByLocationNameContainingIgnoreCaseOrAreaContainingIgnoreCaseOrLandmarkContainingIgnoreCase(
                    search, search, search);
        } else {
            // Fetch all locations
            locations = locationRepository.findAll();
        }

        if (locations.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no locations are found
        }

        return ResponseEntity.ok(locations);
    }

    @PostMapping
    public ResponseEntity<?> addLocation(@RequestBody LocationDTO locationDTO) {
        City city = cityRepository.findById(locationDTO.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found"));

        Location location = new Location();
        location.setCity(city);
        location.setLocationName(locationDTO.getLocationName());
        location.setAddress(locationDTO.getAddress());
        location.setArea(locationDTO.getArea());
        location.setLandmark(locationDTO.getLandmark());
        location.setState(locationDTO.getState());
        location.setPincode(locationDTO.getPincode());
        location.setLatitude(locationDTO.getLatitude());
        location.setLongitude(locationDTO.getLongitude());

        Location savedLocation = locationRepository.save(location);
        int currentNoOfLocations=city.getNoOfLocations();
        city.setNoOfLocations(currentNoOfLocations+1);
        cityRepository.save(city);

        return ResponseEntity.ok(savedLocation);
    }
}
