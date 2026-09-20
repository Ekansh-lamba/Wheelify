package com.gn.agencies.repository;

import com.gn.agencies.entity.CustomerLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerLocationRepository extends JpaRepository<CustomerLocation, Long> {
}
