package com.financial_simulator.backend.dto;

import lombok.Getter;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime createdAt;
}
