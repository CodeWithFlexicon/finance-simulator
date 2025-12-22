package com.financial_simulator.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AccountResponse {
    private Long id;
    private String accountType;
    private String name;
    private BigDecimal balance;
    private BigDecimal interestRate;
    private LocalDateTime createdAt;
}
