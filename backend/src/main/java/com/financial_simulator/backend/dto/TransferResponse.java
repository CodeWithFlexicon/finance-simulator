package com.financial_simulator.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TransferResponse {
    private Long fromAccountId;
    private Long toAccountId;
    private BigDecimal amount;
    private BigDecimal fromBalanceAfter;
    private BigDecimal toBalanceAfter;
    private LocalDateTime createdAt;
}
