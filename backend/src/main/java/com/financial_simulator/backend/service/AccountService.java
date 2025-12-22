package com.financial_simulator.backend.service;

import com.financial_simulator.backend.dto.AccountResponse;
import com.financial_simulator.backend.model.*;
import com.financial_simulator.backend.repository.AccountRepository;
import com.financial_simulator.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepo;
    private final UserRepository userRepo;

    public AccountService(AccountRepository accountRepo, UserRepository userRepo) {
        this.accountRepo = accountRepo;
        this.userRepo = userRepo;
    }

    public Account createAccount(Long userId, AccountType type, String name) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        BigDecimal rate = switch (type) {
            case CHECKING -> BigDecimal.ZERO;
            case SAVINGS -> new BigDecimal("0.015");
            case HYSA     -> new BigDecimal("0.045");
        };

        Account account = new Account(user, name, type, rate);
        return accountRepo.save(account);
    }

    public List<Account> getUserAccounts(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return accountRepo.findByUser(user);
    }

    public Account getAccount(Long accountId, Long userId) {
        Account account = accountRepo.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!account.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        return account;
    }

    public AccountResponse response(Account account) {
        return new AccountResponse(
                account.getId(),
                account.getAccountType().name(),
                account.getName(),
                account.getBalance(),
                account.getInterestRate(),
                account.getCreatedAt()
        );
    }
}