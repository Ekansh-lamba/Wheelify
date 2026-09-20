package com.gn.agencies.service;

import com.gn.agencies.DTO.PaymentRequestDTO;
import com.gn.agencies.DTO.RentalDetailsDTO;
import com.gn.agencies.entity.Car;
import com.gn.agencies.entity.Payment;
import com.gn.agencies.entity.Rental;
import com.gn.agencies.repository.CarRepository;
import com.gn.agencies.repository.PaymentRepository;
import com.gn.agencies.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RentalService {
    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    public Rental saveRental(Rental rental) {
        return rentalRepository.save(rental);
    }


    public List<RentalDetailsDTO> getActiveRentalDetails(Long customerId) {
        List<Rental> activeRentals = rentalRepository.findAllByCustomerIdAndEndTimeIsNull(customerId);

        List<RentalDetailsDTO> rentalDetailsList = new ArrayList<>();
        List<Payment> payment = paymentRepository.findByCustomerId(customerId);
        int i=0;
        for (Rental rental : activeRentals) {
            Car car = carRepository.findById(rental.getCar().getId())
                    .orElseThrow(() -> new RuntimeException("Car not found"));

            long elapsedTimeInHours = Duration.between(rental.getStartTime(), LocalDateTime.now()).toHours();
            double totalAmount = (elapsedTimeInHours * car.getHourlyRate()) - payment.get(i).getAmount();

            RentalDetailsDTO rentalDetailsDTO = new RentalDetailsDTO(
                    car.getId(),
                    car.getName(),
                    car.getCarBrand(),
                    rental.getStartTime(),
                    elapsedTimeInHours,
                    totalAmount
            );

            rentalDetailsList.add(rentalDetailsDTO);

        }

        return rentalDetailsList;
    }

    public void updateRentalAfterPayment(PaymentRequestDTO paymentRequest) {
    }
    public Rental updateRental(Long carId, Long customerId, Double totalAmount, LocalDateTime endTime) {
        Optional<Rental> rentalOptional = rentalRepository.findActiveRentalByCarAndCustomer(carId, customerId);

        if (rentalOptional.isPresent()) {
            Rental rental = rentalOptional.get();
            rental.setTotalAmount(totalAmount);
            rental.setEndTime(endTime);
            return rentalRepository.save(rental);
        } else {
            throw new RuntimeException("Rental record not found for the provided car and customer IDs.");
        }
    }
    public long getTotalActiveRentals() {
        return rentalRepository.countByEndTimeIsNull();
    }

    // Get list of current rentals
    public List<Rental> getCurrentRentals() {
        return rentalRepository.findByEndTimeIsNull();
    }

    // Get list of available cars
    public List<Car> getAvailableCars() {
        return carRepository.findAvailableCars();
    }

    public long countTotalRentals() {
        return rentalRepository.count();
    }

    public long countAvailableCars() {
        return carRepository.countAvailableCars();
    }

    // Current rentals (cars where endTime is NULL)
    public long countCurrentRentals() {
        return rentalRepository.countByEndTimeIsNull();
    }

    public Car getMostBookedCarByCustomer(Long customerId) {
        return rentalRepository.findMostBookedCarByCustomer(customerId)
                .orElseThrow(() -> new RuntimeException("No car found booked more than 2 times by this customer."));
    }

}
