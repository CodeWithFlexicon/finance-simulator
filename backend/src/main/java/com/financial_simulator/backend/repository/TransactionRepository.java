package com.financial_simulator.backend.repository;

import com.financial_simulator.backend.model.Transaction;
import com.financial_simulator.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

public interface TransactionRepository extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {
    List<Transaction> findByAccountOrderByCreatedAtDesc(Account account);
    Optional<Transaction> findByIdAndAccount_User_Id(Long id, Long userId);

    interface MonthTotalsRow {
        LocalDate getMonthDate();
        BigDecimal getIncome();
        BigDecimal getExpense();
    }

    interface CategoryTotalsRow {
        LocalDate getMonthDate();
        Long getCategoryId();
        String getCategoryName();
        String getDirection();
        BigDecimal getTotal();
    }

    interface SpentByCategoryRow {
        Long getCategoryId();
        BigDecimal getSpent();
    }

    @Query(value = """
            SELECT
                date_trunc('month', t.created_at)::date AS month_date,
                COALESCE(SUM(
                    CASE
                        WHEN t.transaction_type = 'DEPOSIT'
                        OR (:includeTransfers = true AND t.transaction_type = 'TRANSFER_IN')
                        THEN t.amount
                        ELSE 0
                    END
                ), 0) AS income,
                COALESCE(SUM(
                    CASE
                        WHEN t.transaction_type = 'WITHDRAWAL'
                        OR (:includeTransfers = true AND t.transaction_type = 'TRANSFER_OUT')
                        THEN t.amount
                        ELSE 0
                    END
                ), 0) AS expense
            FROM transactions t
            JOIN accounts a ON a.id = t.account_id
            WHERE a.user_id = :userId
            AND (:accountId IS NULL OR a.id = :accountId)
            AND t.created_at >= :startAt
            AND t.created_at < :endExclusive
            AND (:includeTransfers = true OR t.transaction_type NOT IN ('TRANSFER_IN', 'TRANSFER_OUT'))
            GROUP BY month_date
            ORDER BY month_date
            """, nativeQuery = true)
    List<MonthTotalsRow> findMonthTotals(
            @Param("userId") Long userId,
            @Param("accountId") Long accountId,
            @Param("startAt") LocalDateTime startAt,
            @Param("endExclusive") LocalDateTime endExclusive,
            @Param("includeTransfers") boolean includeTransfers
    );

    @Query(value = """
            SELECT
                date_trunc('month', t.created_at)::date AS month_date,
                t.category_id AS category_id,
                COALESCE(c.name, 'Uncategorized') AS category_name,
                CASE
                    WHEN t.transaction_type IN ('DEPOSIT', 'TRANSFER_IN') THEN 'INCOME'
                    ELSE 'EXPENSE'
                END AS direction,
                COALESCE(SUM(t.amount), 0) AS total
            FROM transactions t
            JOIN accounts a ON a.id = t.account_id
            LEFT JOIN categories c ON c.id = t.category_id
            WHERE a.user_id = :userId
            AND (:accountId IS NULL OR a.id = :accountId)
            AND t.created_at >= :startAt
            AND t.created_at < :endExclusive
            AND (:includeTransfers = true OR t.transaction_type NOT IN ('TRANSFER_IN', 'TRANSFER_OUT'))
            GROUP BY month_date, category_id, category_name, direction
            ORDER BY month_date, direction, total DESC
            """, nativeQuery = true)
    List<CategoryTotalsRow> findCategoryTotals(
            @Param("userId") Long userId,
            @Param("accountId") Long accountId,
            @Param("startAt") LocalDateTime startAt,
            @Param("endExclusive") LocalDateTime endExclusive,
            @Param("includeTransfers") boolean includeTransfers
    );

    @Query(value = """
            SELECT
                t.category_id AS category_id,
                COALESCE(SUM(t.amount), 0) AS spent
            FROM transactions t
            JOIN accounts a ON a.id = t.account_id
            WHERE a.user_id = :userId
            AND t.created_at >= :startAt
            AND t.created_at < :endExclusive
            AND t.category_id IN (:categoryIds)
            AND (
                t.transaction_type = 'WITHDRAWAL'
                OR (:includeTransfers = true AND t.transaction_type = 'TRANSFER_OUT')
            )
            AND (:accountId IS NULL OR a.id = :accountId)
            GROUP BY t.category_id
            """, nativeQuery = true)
    List<SpentByCategoryRow> findSpentByCategoryForMonth(
            @Param("userId") Long userId,
            @Param("accountId") Long accountId,
            @Param("categoryIds") List<Long> categoryIds,
            @Param("startAt") LocalDateTime startAt,
            @Param("endExclusive") LocalDateTime endExclusive,
            @Param("includeTransfers") boolean includeTransfers
    );
}
