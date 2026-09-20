package com.gn.agencies.repository;

import com.gn.agencies.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Find admin by username and password (consider using a more secure method for authentication)
    Admin findByUsernameAndPassword(String username, String password);

    // Find admin by username
    Admin findByUsername(String username);
}
