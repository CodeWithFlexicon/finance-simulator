package com.financial_simulator.backend.dto;

import com.financial_simulator.backend.model.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class CategoryResponse {
    private Long id;
    private String name;
    private CategoryType categoryType;
    private LocalDateTime createdAt;
}
