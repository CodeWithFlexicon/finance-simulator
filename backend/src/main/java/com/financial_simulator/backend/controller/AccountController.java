package com.financial_simulator.backend.controller;

import com.financial_simulator.backend.dto.AccountRequest;
import com.financial_simulator.backend.dto.AccountResponse;
import com.financial_simulator.backend.dto.AmountRequest;
import com.financial_simulator.backend.model.Account;
import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public ResponseEntity<AccountResponse> create(
            @AuthenticationPrincipal User user,
            @RequestBody AccountRequest request
    ) {
        Account account = accountService.createAccount(
                user.getId(),
                request.getAccountType(),
                request.getName()
        );
        return ResponseEntity.status(201).body(accountService.response(account));
    }

    @GetMapping
    public ResponseEntity<List<AccountResponse>> list(@AuthenticationPrincipal User user) {
        List<AccountResponse> accounts = accountService.getUserAccounts(user.getId()).stream().map(accountService::response).toList();

        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountResponse> get(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ) {
        Account account = accountService.getAccount(id, user.getId());

        return ResponseEntity.ok(accountService.response(account));
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<AccountResponse> deposit(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody AmountRequest request) {
        Account account = accountService.deposit(id, user.getId(), request.getAmount());
        return ResponseEntity.ok(accountService.response(account));
    }

    @PostMapping("/{id}/withdraw")
    public ResponseEntity<AccountResponse> withdraw(@AuthenticationPrincipal User user, @PathVariable Long id, @RequestBody AmountRequest request) {
        Account account = accountService.withdraw(id, user.getId(), request.getAmount());
        return ResponseEntity.ok(accountService.response(account));
    }
}
