package com.gn.agencies.dao;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Feedbackdao {
    private Long id;
    private String customerName;
    private String customerEmail;
    private String feedbackText;
    private LocalDateTime createdAt;

    // Getters and Setters
}

