package com.financial_simulator.backend.repository;

import com.financial_simulator.backend.model.Transaction;
import com.financial_simulator.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccount(Account account);
    List<Transaction> findByAccountOrderByCreatedAtDesc(Account account);
}
