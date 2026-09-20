package com.gn.agencies.repository;

import com.gn.agencies.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    Optional<Car> findById(Long id);

    @Query("SELECT c FROM Car c WHERE c.id NOT IN (SELECT r.car.id FROM Rental r WHERE r.endTime IS NULL)")
    List<Car> findAvailableCars();

    @Query("SELECT COUNT(*) FROM Car c")
    long countAvailableCars();



}