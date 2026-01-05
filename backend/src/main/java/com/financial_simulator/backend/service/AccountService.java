package com.financial_simulator.backend.service;

import com.financial_simulator.backend.dto.AccountResponse;
import com.financial_simulator.backend.dto.TransactionResponse;
import com.financial_simulator.backend.dto.TransferResponse;
import com.financial_simulator.backend.model.*;
import com.financial_simulator.backend.repository.AccountRepository;
import com.financial_simulator.backend.repository.TransactionRepository;
import com.financial_simulator.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepo;
    private final UserRepository userRepo;
    private final TransactionRepository transactionRepo;

    public AccountService(AccountRepository accountRepo, UserRepository userRepo, TransactionRepository transactionRepo) {
        this.accountRepo = accountRepo;
        this.userRepo = userRepo;
        this.transactionRepo = transactionRepo;
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

    @Transactional
    public Account deposit(Long accountId, Long userId, BigDecimal amount) {
        Account account = getAccount(accountId, userId);

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Deposit amount must be greater than 0.00");
        }

        BigDecimal newBalance = account.getBalance().add(amount).setScale(2);

        account.applyNewBalance(newBalance);

        transactionRepo.save(
                new Transaction(account, TransactionType.DEPOSIT, amount, newBalance)
        );

        return account;
    }

    @Transactional
    public Account withdraw(Long accountId, Long userId, BigDecimal amount) {
        Account account = getAccount(accountId, userId);

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Withdrawal must be greater than 0.00");
        }

        if (account.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        BigDecimal newBalance = account.getBalance().subtract(amount).setScale(2);

        account.applyNewBalance(newBalance);

        transactionRepo.save(
                new Transaction(account, TransactionType.WITHDRAWAL, amount, newBalance)
        );

        return account;
    }

    public List<TransactionResponse> getAccountTransactions(Long accountId, Long userId) {
        Account account = getAccount(accountId, userId);

        return transactionRepo
                .findByAccountOrderByCreatedAtDesc(account)
                .stream()
                .map(tx -> new TransactionResponse(
                    tx.getId(),
                    tx.getType().name(),
                    tx.getAmount(),
                    tx.getBalanceAfter(),
                    tx.getCreatedAt()
                )).toList();
    }

    @Transactional
    public TransferResponse transfer(Long userId, Long fromId, Long toId, BigDecimal amount) {
        if (fromId.equals(toId)) {
            throw new RuntimeException("Cannot transfer to the same account");
        }

        if(amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Transfer amount must be greater than 0.00");
        }

        Account from = getAccount(fromId, userId);
        Account to = getAccount(toId, userId);

        if (from.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        BigDecimal fromNewBalance = from.getBalance().subtract(amount).setScale(2, RoundingMode.HALF_UP);
        BigDecimal toNewBalance = to.getBalance().add(amount).setScale(2, RoundingMode.HALF_UP);

        from.applyNewBalance(fromNewBalance);
        to.applyNewBalance(toNewBalance);
        amount = amount.setScale(2, RoundingMode.HALF_UP);

        transactionRepo.save(
                new Transaction(from, TransactionType.TRANSFER_OUT, amount, fromNewBalance)
        );

        transactionRepo.save(
                new Transaction(to, TransactionType.TRANSFER_IN, amount, toNewBalance)
        );

        return new TransferResponse(
                fromId,
                toId,
                amount,
                fromNewBalance,
                toNewBalance,
                LocalDateTime.now()
        );
    }
}