package com.gn.agencies.repository;

import com.gn.agencies.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByLoginIdAndPassword(String loginId, String password);
    Optional<Customer> findByLoginId(String loginId);
    List<Customer> findByNameContainingIgnoreCase(String name);

}
