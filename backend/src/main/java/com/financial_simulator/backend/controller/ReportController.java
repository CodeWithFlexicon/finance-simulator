package com.financial_simulator.backend.controller;

import com.financial_simulator.backend.dto.MonthlyReportResponse;
import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/monthly")
    public ResponseEntity<MonthlyReportResponse> monthly(
            @AuthenticationPrincipal User user,
            @RequestParam YearMonth start,
            @RequestParam YearMonth end,
            @RequestParam(required = false) Long accountId,
            @RequestParam(defaultValue = "false") boolean includeTransfers
    ) {
        MonthlyReportResponse response = reportService.monthly(user.getId(), start, end, accountId, includeTransfers);

        return ResponseEntity.ok(response);
    }
}
