package com.financial_simulator.backend.dto;

import com.financial_simulator.backend.model.CategoryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank
    @Size(max = 50)
    private String name;

    @NotNull
    private CategoryType categoryType;
}
