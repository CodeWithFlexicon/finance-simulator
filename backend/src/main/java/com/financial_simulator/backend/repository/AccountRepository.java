package com.financial_simulator.backend.repository;

import com.financial_simulator.backend.model.Account;
import com.financial_simulator.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUser(User user);
}
