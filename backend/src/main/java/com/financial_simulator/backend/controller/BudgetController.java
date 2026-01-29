package com.financial_simulator.backend.controller;

import com.financial_simulator.backend.dto.BudgetResponse;
import com.financial_simulator.backend.dto.BudgetStatusResponse;
import com.financial_simulator.backend.dto.BudgetUpsertRequest;
import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PutMapping("/{categoryId}/{month}")
    public ResponseEntity<BudgetResponse> upsert(
            @AuthenticationPrincipal User user,
            @PathVariable Long categoryId,
            @PathVariable String month,
            @Valid @RequestBody BudgetUpsertRequest request
    ) {
        YearMonth ym = YearMonth.parse(month);
        BudgetResponse res = budgetService.upsert(user.getId(), categoryId, ym, request.getAmount());
        return ResponseEntity.ok(res);
    }

    @GetMapping
    public ResponseEntity<List<BudgetStatusResponse>> list(
            @AuthenticationPrincipal User user,
            @RequestParam String month,
            @RequestParam(required = false) Long accountId,
            @RequestParam(defaultValue = "false") boolean includeTransfers
    ) {
        YearMonth ym = YearMonth.parse(month);
        return ResponseEntity.ok(budgetService.listForMonth(user.getId(), ym, accountId, includeTransfers));
    }
}
