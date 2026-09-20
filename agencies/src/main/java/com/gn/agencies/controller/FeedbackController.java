package com.gn.agencies.controller;

import com.gn.agencies.DTO.FeedbackDTO;
import com.gn.agencies.dao.Feedbackdao;
import com.gn.agencies.entity.Customer;
import com.gn.agencies.entity.Feedback;
import com.gn.agencies.repository.CustomerRepository;
import com.gn.agencies.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        try {
            // Fetch the customer
            Customer customer = customerRepository.findById(feedbackDTO.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + feedbackDTO.getCustomerId()));

            // Create Feedback object
            Feedback feedback = new Feedback();
            feedback.setCustomer(customer);
            feedback.setFeedbackText(feedbackDTO.getFeedbackText());

            // Save Feedback
            feedbackRepository.save(feedback);

            return ResponseEntity.ok("Feedback submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving feedback: " + e.getMessage());
        }
    }


    @GetMapping
    public List<Feedbackdao> getAllFeedback() {
        return feedbackRepository.findAll().stream().map(feedback -> {
            Feedbackdao feedbackdao = new Feedbackdao();
            feedbackdao.setId((long) feedback.getId());
            feedbackdao.setCustomerName(feedback.getCustomer().getName());
            feedbackdao.setCustomerEmail(feedback.getCustomer().getEmail());
            feedbackdao.setFeedbackText(feedback.getFeedbackText());
            feedbackdao.setCreatedAt(feedback.getCreatedAt().toLocalDateTime());
            return feedbackdao;
        }).collect(Collectors.toList());
    }
    @GetMapping("/messages")
    public ResponseEntity<List<Feedbackdao>> getMessagesForCustomer(@RequestParam String userName) {
        try {
            List<Feedbackdao> feedbackList = feedbackRepository
                    .findFeedbackByCustomerName(userName)
                    .stream()
                    .map(feedback -> {
                        Feedbackdao feedbackdao = new Feedbackdao();
                        feedbackdao.setId((long) feedback.getId());
                        feedbackdao.setCustomerName(feedback.getCustomer().getName());
                        feedbackdao.setFeedbackText(feedback.getFeedbackText());
                        feedbackdao.setCreatedAt(feedback.getCreatedAt().toLocalDateTime());
                        return feedbackdao;
                    })
                    .collect(Collectors.toList());
            return ResponseEntity.ok(feedbackList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}

