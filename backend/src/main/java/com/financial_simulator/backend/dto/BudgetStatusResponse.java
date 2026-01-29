package com.financial_simulator.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class BudgetStatusResponse {
    private Long categoryId;
    private String categoryName;
    private String month;
    private BigDecimal budget;
    private BigDecimal spent;
    private BigDecimal remaining;
    private BigDecimal percentUsed;
}
