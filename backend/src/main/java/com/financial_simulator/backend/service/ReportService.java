package com.financial_simulator.backend.service;

import com.financial_simulator.backend.dto.CategoryTotal;
import com.financial_simulator.backend.dto.MonthlyBucket;
import com.financial_simulator.backend.dto.MonthlyReportResponse;
import com.financial_simulator.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;


@Service
public class ReportService {
    private static final BigDecimal ZERO_2 = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
    private final TransactionRepository transactionRepo;

    public ReportService(TransactionRepository transactionRepo) {
        this.transactionRepo = transactionRepo;
    }

    public MonthlyReportResponse monthly(Long userId, YearMonth start, YearMonth end, Long accountId, boolean includeTransfers) {
        if (end.isBefore(start)) {
            throw new RuntimeException("end must be >= start");
        }

        LocalDateTime startAt = start.atDay(1).atStartOfDay();
        LocalDateTime endExclusive = end.plusMonths(1).atDay(1).atStartOfDay();

        Map<YearMonth, Totals> monthTotals = new HashMap<>();
        for (var row : transactionRepo.findMonthTotals(userId, accountId, startAt, endExclusive, includeTransfers)) {
            YearMonth ym = YearMonth.from(row.getMonthDate());
            BigDecimal income = scale2(row.getIncome());
            BigDecimal expense = scale2(row.getExpense());
            monthTotals.put(ym, new Totals(income, expense));
        }

        Map<YearMonth, List<CategoryTotal>> monthCats = new HashMap<>();
        for (var row : transactionRepo.findCategoryTotals(userId, accountId, startAt, endExclusive, includeTransfers)) {
            YearMonth ym = YearMonth.from(row.getMonthDate());
            monthCats.computeIfAbsent(ym, __ -> new ArrayList<>()).add(
                    new CategoryTotal(
                            row.getCategoryId(),
                            row.getCategoryName(),
                            row.getDirection(),
                            scale2(row.getTotal())
                    )
            );
        }

        List<MonthlyBucket> buckets = new ArrayList<>();
        YearMonth curr = start;

        while (!curr.isAfter(end)) {
            Totals t = monthTotals.getOrDefault(curr, new Totals(ZERO_2, ZERO_2));
            BigDecimal net = scale2(t.income.subtract(t.expense));
            List<CategoryTotal> cats = monthCats.getOrDefault(curr, List.of());

            buckets.add(new MonthlyBucket(
                    curr.toString(),
                    t.income,
                    t.expense,
                    net,
                    cats
            ));

            curr = curr.plusMonths(1);
        }

        return new MonthlyReportResponse(start.toString(), end.toString(), accountId, includeTransfers, buckets);
    }

    private BigDecimal scale2(BigDecimal v) {
        if (v == null) return ZERO_2;
        return v.setScale(2, RoundingMode.HALF_UP);
    }

    private record Totals(BigDecimal income, BigDecimal expense) {}
}
