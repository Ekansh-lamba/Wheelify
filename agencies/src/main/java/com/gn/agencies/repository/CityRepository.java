package com.gn.agencies.repository;

import com.gn.agencies.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    /**
     * Find a city by its name.
     *
     * @param cityName The name of the city.
     * @return An optional City object.
     */
    Optional<City> findByCityName(String cityName);

    /**
     * Check if a city with the given name exists.
     *
     * @param cityName The name of the city.
     * @return true if the city exists, false otherwise.
     */
    boolean existsByCityName(String cityName);

    List<City> findByCityNameContainingIgnoreCase(String cityName);
}
