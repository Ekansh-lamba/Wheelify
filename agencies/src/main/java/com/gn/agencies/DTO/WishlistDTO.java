package com.gn.agencies.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishlistDTO {
    private Long id;          // Wishlist ID
    private Long customerId;  // Customer ID
    private Long carId;       // Car ID
      // Optional: Car brand
}
