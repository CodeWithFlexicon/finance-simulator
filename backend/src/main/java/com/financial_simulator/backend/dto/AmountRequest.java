package com.financial_simulator.backend.dto;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class AmountRequest {
    private BigDecimal amount;
}
