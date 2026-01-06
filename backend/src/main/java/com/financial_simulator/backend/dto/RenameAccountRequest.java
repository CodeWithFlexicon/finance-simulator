package com.financial_simulator.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class RenameAccountRequest {
    @NotBlank
    @Size(max = 100)
    private String name;
}
