package com.financial_simulator.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private String token;
}
