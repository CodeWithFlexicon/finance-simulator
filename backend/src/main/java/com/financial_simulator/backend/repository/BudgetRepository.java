package com.financial_simulator.backend.repository;

import com.financial_simulator.backend.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByUser_IdAndCategory_IdAndMonthDate(Long userId, Long categoryId, LocalDate monthDate);
    List<Budget> findByUser_IdAndMonthDate(Long userId, LocalDate monthDate);
}
