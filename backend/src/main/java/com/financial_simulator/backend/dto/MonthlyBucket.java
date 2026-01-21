package com.financial_simulator.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class MonthlyBucket {
    private String month;
    private BigDecimal income;
    private BigDecimal expense;
    private BigDecimal net;
    private List<CategoryTotal> byCategory;
}
