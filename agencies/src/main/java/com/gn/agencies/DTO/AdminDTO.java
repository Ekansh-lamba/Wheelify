    package com.gn.agencies.DTO;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class AdminDTO {
        private Long id;          // Required for updates
        private String username;  // Admin's username
        private String password;  // Admin's password (consider security implications)
    }
