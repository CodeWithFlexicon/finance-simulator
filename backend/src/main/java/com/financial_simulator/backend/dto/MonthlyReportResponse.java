package com.financial_simulator.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MonthlyReportResponse {
    private String start;
    private String end;
    private Long accountId;
    private boolean includeTransfers;
    private List<MonthlyBucket> months;
}
