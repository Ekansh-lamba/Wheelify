package com.gn.agencies.service;

import com.gn.agencies.entity.Location;
import com.gn.agencies.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
}
