package com.gn.agencies.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    private Long customerId;
    private String feedbackText;

    // Getters and Setters
}

