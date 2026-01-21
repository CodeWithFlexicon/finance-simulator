package com.financial_simulator.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CategoryTotal {
    private Long categoryId;
    private String categoryName;
    private String direction;
    private BigDecimal total;
}
