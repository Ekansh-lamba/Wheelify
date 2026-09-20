package com.gn.agencies.repository;

import com.gn.agencies.entity.CarsInLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarsInLocationRepository extends JpaRepository<CarsInLocation, Long> {
}
