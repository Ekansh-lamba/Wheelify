package com.gn.agencies.repository;

import com.gn.agencies.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    List<Location> findByCityId(Long cityId);

    List<Location> findByLocationNameContainingIgnoreCaseOrAreaContainingIgnoreCaseOrLandmarkContainingIgnoreCase(
            String locationName, String area, String landmark);
}
