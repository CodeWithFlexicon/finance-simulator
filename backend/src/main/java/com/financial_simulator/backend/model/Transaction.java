package com.financial_simulator.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id")
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type", nullable = false)
    private TransactionType type;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private BigDecimal balanceAfter;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Transaction(Account account, TransactionType type, BigDecimal amount, BigDecimal balanceAfter) {
        this.account = account;
        this.type = type;
        this.amount = amount.setScale(2);
        this.balanceAfter = balanceAfter.setScale(2);
    }
}
