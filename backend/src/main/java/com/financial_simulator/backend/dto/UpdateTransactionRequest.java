package com.financial_simulator.backend.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateTransactionRequest {
    private Long categoryId;
    @Size(max = 255)
    private String memo;
}
