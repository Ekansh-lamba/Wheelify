package com.gn.agencies.service;

import com.gn.agencies.DTO.PaymentRequestDTO;
import com.gn.agencies.entity.Payment;
import com.gn.agencies.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public void savePayment(Payment payment) {
        paymentRepository.save(payment);
    }
}
