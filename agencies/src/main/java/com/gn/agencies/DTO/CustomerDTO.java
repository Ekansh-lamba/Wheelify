package com.gn.agencies.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Long id;          // Required for updates
    private String name;     // Customer's name
    private String email;    // Customer's email
    private String address;   // Customer's address
    private Long phnumber;    // Customer's phone number
    private String loginId;   // Login ID for authentication purposes
    private String password;   // Customer's password (consider security implications)
}
