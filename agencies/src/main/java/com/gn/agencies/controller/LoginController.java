    package com.gn.agencies.controller;

    import com.gn.agencies.entity.Admin;
    import com.gn.agencies.entity.Customer;
    import com.gn.agencies.repository.AdminRepository;
    import com.gn.agencies.repository.CustomerRepository;
    import jakarta.servlet.http.HttpSession;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.HashMap;
    import java.util.Map;
    import java.util.Optional;

    @RestController
    @RequestMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
    public class LoginController {

        @Autowired
        private AdminRepository adminRepository;
        @Autowired
        private CustomerRepository customerRepository;

        // Existing login method for authentication
        @PostMapping
        public String login(@RequestBody Map<String, String> loginData) {
            String username = loginData.get("username");
            String password = loginData.get("password");

            Admin foundAdmin = adminRepository.findByUsernameAndPassword(username, password);
            if (foundAdmin != null) {
                System.out.println("Admin login successful: " + foundAdmin);
                return "admin";
            }

            // Check if the user is a Customer
            Customer foundCustomer = customerRepository.findByLoginIdAndPassword(username, password);
            if (foundCustomer != null) {
                System.out.println("Customer login successful: " + foundCustomer);
                return "customer";
            }

            // If neither Admin nor Customer is found
            return "Invalid credentials";
        }

        // New endpoint to fetch user details
        @PostMapping("/details")
        public ResponseEntity<Map<String, String>> fetchUserDetails(@RequestBody Map<String, String> loginData) {
            String username = loginData.get("username");
            String password = loginData.get("password");

            // Check if the user is an Admin
            Admin foundAdmin = adminRepository.findByUsernameAndPassword(username, password);
            if (foundAdmin != null) {
                Map<String, String> adminDetails = new HashMap<>();
                adminDetails.put("role", "admin");
                adminDetails.put("loginId", foundAdmin.getUsername());
                adminDetails.put("name", "Admin");
                return ResponseEntity.ok(adminDetails);
            }

            // Check if the user is a Customer
            Customer foundCustomer = customerRepository.findByLoginIdAndPassword(username, password);
            if (foundCustomer != null) {
                Map<String, String> customerDetails = new HashMap<>();
                customerDetails.put("role", "customer");
                customerDetails.put("loginId", foundCustomer.getLoginId());
                customerDetails.put("name", foundCustomer.getName());
                return ResponseEntity.ok(customerDetails);
            }

            // If neither Admin nor Customer is found
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }

        @PostMapping("/user-info")
        public Map<String, String> getUserInfo(@RequestBody Map<String, String> loginData) {
            String username = loginData.get("username");

            // Admin lookup
            Admin foundAdmin = adminRepository.findByUsername(username);
            if (foundAdmin != null) {
                return Map.of(
                        "role", "admin",
                        "name", "Admin"
                );
            }

            // Customer lookup using Optional
            Optional<Customer> optionalCustomer = customerRepository.findByLoginId(username);
            if (optionalCustomer.isPresent()) {
                Customer foundCustomer = optionalCustomer.get();
                return Map.of(
                        "role", "customer",
                        "name", foundCustomer.getName()
                );
            }

            // If no user is found
            return Map.of("role", "guest", "name", "Guest");
        }
    }