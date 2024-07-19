package com.sparta.tp.bankoftam.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "bank_account", schema = "bankoftam_db")
public class BankAccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "account_number")
    private Long accountNumber;

    @NotNull
    private double balance = 0.0;

    @OneToOne(mappedBy = "bankAccount")
    private UserEntity user;

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    @NotNull
    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if(amount <= 0){
            throw new IllegalArgumentException("Amount must be greater than 0");
        }
        this.balance += amount;
    }

    public void withdraw(double amount) {
        if(amount <= 0){
            throw new IllegalArgumentException("Amount must be greater than 0");
        }
        if (this.balance < amount) {
            throw new IllegalArgumentException("Insufficient balance");
        }
        this.balance -= amount;
    }

    public void setBalance(@NotNull double balance) {
        this.balance = balance;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
