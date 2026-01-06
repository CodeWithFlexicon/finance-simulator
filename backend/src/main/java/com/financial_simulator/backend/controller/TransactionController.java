package com.financial_simulator.backend.controller;

import com.financial_simulator.backend.dto.TransactionResponse;
import com.financial_simulator.backend.dto.UpdateTransactionRequest;
import com.financial_simulator.backend.model.Transaction;
import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PatchMapping("/transactions/{txId}")
    public ResponseEntity<TransactionResponse> update(@AuthenticationPrincipal User user, @PathVariable Long txId, @Valid @RequestBody UpdateTransactionRequest request) {
        Transaction updated = transactionService.update(user.getId(), txId, request);
        return ResponseEntity.ok(transactionService.response(updated));
    }

    @GetMapping("/accounts/{accountId}/transactions")
    public ResponseEntity<List<TransactionResponse>> transactions(@AuthenticationPrincipal User user, @PathVariable Long accountId) {
        List<TransactionResponse> transactions = transactionService.listForAccount(user.getId(), accountId);
        return ResponseEntity.ok(transactions);
    }
}
