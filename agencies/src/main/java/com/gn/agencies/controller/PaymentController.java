package com.gn.agencies.controller;

import com.gn.agencies.DTO.PaymentRequestDTO;
import com.gn.agencies.dao.PaymentRequest;
import com.gn.agencies.entity.Customer;
import com.gn.agencies.entity.Payment;
import com.gn.agencies.entity.Rental;
import com.gn.agencies.repository.CustomerRepository;
import com.gn.agencies.service.PaymentService;
import com.gn.agencies.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RentalService rentalService;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @PostMapping
    public ResponseEntity<String> savePayment(@RequestBody PaymentRequest paymentRequest) {
        // Fetch the customer from the database
        Customer customer = customerRepository.findById(paymentRequest.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + paymentRequest.getCustomerId()));

        // Create a new Payment object
        Payment payment = new Payment();
        payment.setAmount(paymentRequest.getAmount());
        payment.setMethod(paymentRequest.getMethod());
        payment.setCustomer(customer);
        payment.setCarId(paymentRequest.getCarId());
        payment.setLicenseNumber(paymentRequest.getLicenseNumber());
        // Save the payment using the service
        paymentService.savePayment(payment);

        return ResponseEntity.ok("Payment saved successfully!");
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completePayment(@RequestBody PaymentRequestDTO paymentRequest) {
        try {
            rentalService.updateRentalAfterPayment(paymentRequest);
            return ResponseEntity.ok("Payment processed and rental updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing payment: " + e.getMessage());
        }
    }


}
