package com.financial_simulator.backend.repository;

import com.financial_simulator.backend.model.Transaction;
import com.financial_simulator.backend.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.*;

public interface TransactionRepository extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {
    List<Transaction> findByAccountOrderByCreatedAtDesc(Account account);
    Optional<Transaction> findByIdAndAccount_User_Id(Long id, Long userId);
}
