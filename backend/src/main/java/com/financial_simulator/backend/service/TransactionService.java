package com.financial_simulator.backend.service;

import com.financial_simulator.backend.dto.TransactionFilterRequest;
import com.financial_simulator.backend.dto.TransactionResponse;
import com.financial_simulator.backend.dto.UpdateTransactionRequest;
import com.financial_simulator.backend.model.Account;
import com.financial_simulator.backend.model.Category;
import com.financial_simulator.backend.model.Transaction;
import com.financial_simulator.backend.model.TransactionType;
import com.financial_simulator.backend.repository.AccountRepository;
import com.financial_simulator.backend.repository.CategoryRepository;
import com.financial_simulator.backend.repository.TransactionRepository;
import com.financial_simulator.backend.specifications.TransactionSpecifications;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepo;
    private final CategoryRepository categoryRepo;
    private final AccountRepository accountRepo;

    public TransactionService(TransactionRepository transactionRepo, CategoryRepository categoryRepo, AccountRepository accountRepo) {
        this.transactionRepo = transactionRepo;
        this.categoryRepo = categoryRepo;
        this.accountRepo = accountRepo;
    }

    public List<TransactionResponse> listForAccount(Long userId, Long accountId) {
        Account account = accountRepo.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!account.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        return transactionRepo.findByAccountOrderByCreatedAtDesc(account)
                .stream()
                .map(this::response)
                .toList();
    }

    @Transactional
    public Transaction update(Long userId, Long txId, UpdateTransactionRequest request) {
        Transaction tx = transactionRepo.findByIdAndAccount_User_Id(txId, userId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (request.getCategoryId() == null) {
            tx.assignCategory(null);
        } else {
            Category category = categoryRepo.findByIdAndUser_Id(request.getCategoryId(), userId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            tx.assignCategory(category);
        }

        tx.assignMemo(request.getMemo());

        return tx;
    }

    public TransactionResponse response(Transaction tx) {
        Category cat = tx.getCategory();
        return new TransactionResponse(
                tx.getId(),
                tx.getType().name(),
                tx.getAmount(),
                tx.getBalanceAfter(),
                tx.getCreatedAt(),
                cat != null ? cat.getId() : null,
                cat != null ? cat.getName() : null,
                tx.getMemo()
        );
    }

    public Page<TransactionResponse> search(Long userId, TransactionFilterRequest f, Pageable pageable) {
        Specification<Transaction> spec = TransactionSpecifications.belongsToUser(userId);

        if (f.getAccountId() != null) {
            spec = spec.and(TransactionSpecifications.accountId(f.getAccountId()));
        }

        if (f.getType() != null) {
            spec = spec.and(TransactionSpecifications.type(f.getType()));
        }

        if (Boolean.TRUE.equals(f.getUncategorized())) {
            spec = spec.and(TransactionSpecifications.uncategorized());
        } else if (f.getCategoryId() != null) {
            spec = spec.and(TransactionSpecifications.categoryId(f.getCategoryId()));
        }

        if (f.getMinAmount() != null) {
            spec = spec.and(TransactionSpecifications.minAmount(f.getMinAmount()));
        }

        if (f.getMaxAmount() != null) {
            spec = spec.and(TransactionSpecifications.maxAmount(f.getMaxAmount()));
        }

        if (f.getFrom() != null) {
            spec = spec.and(TransactionSpecifications.from(f.getFrom()));
        }

        if (f.getTo() != null) {
            spec = spec.and(TransactionSpecifications.to(f.getTo()));
        }

        if (f.getQ() != null) {
            spec = spec.and(TransactionSpecifications.memoContains(f.getQ()));
        }

        return transactionRepo.findAll(spec, pageable).map(this::response);
    }
}
