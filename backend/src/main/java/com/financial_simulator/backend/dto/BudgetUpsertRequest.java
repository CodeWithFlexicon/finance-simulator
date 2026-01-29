package com.financial_simulator.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class BudgetUpsertRequest {
    @NotNull
    @DecimalMin(value = "0.01")
    private BigDecimal amount;
}
