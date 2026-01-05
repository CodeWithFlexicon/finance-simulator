package com.financial_simulator.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false)
    private AccountType accountType;

    @Column(nullable = false)
    private BigDecimal balance = BigDecimal.ZERO;

    @Column(name = "interest_rate", nullable = false)
    private BigDecimal interestRate = BigDecimal.ZERO;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Account(User user, String name, AccountType accountType, BigDecimal interestRate) {
        this.user = user;
        this.name = name;
        this.accountType = accountType;

        this.balance = BigDecimal.ZERO.setScale(2);
        this.interestRate = BigDecimal.ZERO.setScale(3);
    }

    public void applyNewBalance(BigDecimal newBalance) {
        this.balance = newBalance.setScale(2, RoundingMode.HALF_UP);
    }

    public void rename(String newName) {
        this.name = newName;
    }
}
