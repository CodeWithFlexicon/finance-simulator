package com.financial_simulator.backend.dto;

import com.financial_simulator.backend.model.AccountType;
import lombok.Getter;

@Getter
public class AccountRequest {
    private AccountType accountType;
    private String name;
}
