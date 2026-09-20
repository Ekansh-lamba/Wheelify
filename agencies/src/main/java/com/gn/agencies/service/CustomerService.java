package com.gn.agencies.service;

import com.gn.agencies.entity.Customer;
import com.gn.agencies.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Fetch all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Fetch customer by ID
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    // Fetch customer by Login ID
    public Optional<Customer> getCustomerByLoginId(String loginId) {
        return customerRepository.findByLoginId(loginId);
    }

    // Save or update a customer
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Delete a customer by ID
    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found with ID: " + id);
        }
        customerRepository.deleteById(id);
    }

    // Fetch paginated list of customers
    public List<Customer> getPaginatedCustomers(int page, int size) {
        return customerRepository.findAll(PageRequest.of(page, size)).getContent();
    }

    // Search customers by name
    public List<Customer> searchCustomersByName(String name) {
        return customerRepository.findByNameContainingIgnoreCase(name);
    }
}
