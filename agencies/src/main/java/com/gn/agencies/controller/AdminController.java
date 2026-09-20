package com.gn.agencies.controller;

import org.mindrot.jbcrypt.BCrypt;

import com.gn.agencies.DTO.AdminDTO;
import com.gn.agencies.entity.Admin;
import com.gn.agencies.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow React app origin
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    // Fetch admin profile by username (loginId)
    @GetMapping("/profile")
    public ResponseEntity<AdminDTO> getAdminProfile(@RequestParam("loginId") String loginId) {
        Admin admin = adminRepository.findByUsername(loginId);
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if admin not found
        }
        // Convert Admin to AdminDTO
        AdminDTO adminDTO = new AdminDTO(admin.getId(), admin.getUsername(), admin.getPassword());
        return ResponseEntity.ok(adminDTO);
    }

    // Update admin profile
    @PutMapping("/profile")
    public ResponseEntity<AdminDTO> updateAdminProfile(@RequestBody AdminDTO updatedAdmin) {
        return adminRepository.findById(updatedAdmin.getId())
                .map(admin -> {
                    // Update fields as necessary
                    admin.setUsername(updatedAdmin.getUsername());
                    // Be cautious with password handling; consider hashing
                    if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
                        admin.setPassword(BCrypt.hashpw(updatedAdmin.getPassword(), BCrypt.gensalt()));
                    }

                    Admin savedAdmin = adminRepository.save(admin);
                    AdminDTO savedAdminDTO = new AdminDTO(savedAdmin.getId(), savedAdmin.getUsername(), savedAdmin.getPassword());
                    return ResponseEntity.ok(savedAdminDTO); // Return updated admin details
                })
                .orElse(ResponseEntity.notFound().build()); // Return 404 if admin not found
    }
}
