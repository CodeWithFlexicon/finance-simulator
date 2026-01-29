package com.financial_simulator.backend.service;

import com.financial_simulator.backend.dto.BudgetResponse;
import com.financial_simulator.backend.dto.BudgetStatusResponse;
import com.financial_simulator.backend.model.Budget;
import com.financial_simulator.backend.model.Category;
import com.financial_simulator.backend.model.CategoryType;
import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.repository.BudgetRepository;
import com.financial_simulator.backend.repository.CategoryRepository;
import com.financial_simulator.backend.repository.TransactionRepository;
import com.financial_simulator.backend.repository.UserRepository;
import io.micrometer.observation.transport.SenderContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;

@Service
public class BudgetService {
    private static final BigDecimal ZERO_2 = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

    private final BudgetRepository budgetRepo;
    private final UserRepository userRepo;
    private final CategoryRepository categoryRepo;
    private final TransactionRepository transactionRepo;

    public BudgetService(
            BudgetRepository budgetRepo,
            UserRepository userRepo,
            CategoryRepository categoryRepo,
            TransactionRepository transactionRepo
    ) {
        this.budgetRepo = budgetRepo;
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
        this.transactionRepo = transactionRepo;
    }

    @Transactional
    public BudgetResponse upsert(Long userId, Long categoryId, YearMonth month, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Budget amount must be greater than 0.00");
        }

        BigDecimal scaledAmount = scale2(amount);

        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepo.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));

        if (category.getCategoryType() != CategoryType.EXPENSE) {
            throw new RuntimeException("Budgets can only be set for EXPENSE categories");
        }

        LocalDate monthDate = month.atDay(1);

        Budget budget = budgetRepo.findByUser_IdAndCategory_IdAndMonthDate(userId, categoryId, monthDate).orElseGet(() -> new Budget(user, category, monthDate, scaledAmount));

        budget.updateAmount(scaledAmount);
        budgetRepo.save(budget);

        return new BudgetResponse(category.getId(), category.getName(), month.toString(), scaledAmount);
    }

    public List<BudgetStatusResponse> listForMonth(Long userId, YearMonth month, Long accountId, boolean includeTransfers) {
        LocalDate monthDate = month.atDay(1);

        List<Budget> budgets = budgetRepo.findByUser_IdAndMonthDate(userId, monthDate);
        if (budgets.isEmpty()) return List.of();

        List<Long> categoryIds = budgets.stream()
                .map(b -> b.getCategory().getId())
                .distinct()
                .toList();

        LocalDateTime startAt = month.atDay(1).atStartOfDay();
        LocalDateTime endExclusive = month.plusMonths(1).atDay(1).atStartOfDay();

        Map<Long, BigDecimal> spentByCategory = new HashMap<>();
        for (var row : transactionRepo.findSpentByCategoryForMonth(
                userId,
                accountId,
                categoryIds,
                startAt,
                endExclusive,
                includeTransfers
        )) {
            spentByCategory.put(row.getCategoryId(), scale2(row.getSpent()));
        }

        List<BudgetStatusResponse> out = new ArrayList<>();
        for (Budget b : budgets) {
            Long categoryId = b.getCategory().getId();
            BigDecimal budgetAmount = scale2(b.getAmount());
            BigDecimal spent = spentByCategory.getOrDefault(categoryId, ZERO_2);
            BigDecimal remaining = scale2(budgetAmount.subtract(spent));

            BigDecimal percentUsed = budgetAmount.compareTo(BigDecimal.ZERO) == 0 ? ZERO_2 : spent.multiply(new BigDecimal("100")).divide(budgetAmount, 2, RoundingMode.HALF_UP);

            out.add(new BudgetStatusResponse(
                    categoryId,
                    b.getCategory().getName(),
                    month.toString(),
                    budgetAmount,
                    spent,
                    remaining,
                    percentUsed
            ));
        }

        out.sort(Comparator.comparing(BudgetStatusResponse::getPercentUsed).reversed());

        return out;
    }

    private BigDecimal scale2(BigDecimal value) {
        if (value == null) return ZERO_2;
        return value.setScale(2, RoundingMode.HALF_UP);
    }
}
