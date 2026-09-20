package com.gn.agencies.repository;

import com.gn.agencies.entity.Car;
import com.gn.agencies.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    // Custom query to find active rental by customer ID where endTime is null
    @Query("SELECT r FROM Rental r WHERE r.customer.id = :customerId AND r.endTime IS NULL")
    List<Rental> findAllByCustomerIdAndEndTimeIsNull(@Param("customerId") Long customerId);

    // Alternative derived query to find all active rentals
    List<Rental> findByCustomerIdAndStartTimeIsNotNullAndEndTimeIsNull(Long customerId);

    @Query("SELECT r FROM Rental r WHERE r.customer.id = :customerId AND r.car.id = :carId AND r.endTime IS NULL")
    Optional<Rental> findByCustomerIdAndCarIdAndEndTimeIsNull(
            @Param("customerId") Long customerId,
            @Param("carId") Long carId
    );

    @Query("SELECT r FROM Rental r WHERE r.car.id = :carId AND r.endTime IS NULL")
    Optional<Rental> findByCarIdAndEndTimeIsNull(@Param("carId") Long carId);
    Optional<Rental> findByCarIdAndCustomerId(Long carId, Long customerId);

    @Query("SELECT r FROM Rental r WHERE r.car.id = :carId AND r.customer.id = :customerId AND r.endTime IS NULL")
    Optional<Rental> findActiveRentalByCarAndCustomer(@Param("carId") Long carId, @Param("customerId") Long customerId);

    long countByEndTimeIsNull();

    // Find rentals with null endTime
    List<Rental> findByEndTimeIsNull();

    // Fetch all rentals for a customer where endTime is not null
    List<Rental> findByCustomerIdAndEndTimeIsNotNull(Long customerId);

    @Query("SELECT r.car, COUNT(r.car) as booking_count FROM Rental r WHERE r.customer.id = :customerId GROUP BY r.car HAVING COUNT(r.car) > 2 ORDER BY COUNT(r.car) DESC")
    Optional<Car> findMostBookedCarByCustomer(@Param("customerId") Long customerId);


}
