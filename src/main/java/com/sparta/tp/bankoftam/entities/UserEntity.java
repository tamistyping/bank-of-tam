package com.sparta.tp.bankoftam.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user", schema = "bankoftam_db")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min = 3, max = 15)
    @NotNull
    @Column(unique = true)
    private String username;

    @NotNull
    private Integer age;

    @NotNull
    private String animal;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_number", referencedColumnName = "account_number")
    @JsonManagedReference
    private BankAccountEntity bankAccount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BankAccountEntity getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccountEntity bankAccount) {
        this.bankAccount = bankAccount;
        bankAccount.setUser(this);
    }

    public @Size(min = 3, max = 15) @NotNull String getUsername() {
        return username;
    }

    public void setUsername(@Size(min = 3, max = 15) @NotNull String username) {
        this.username = username;
    }

    public @NotNull Integer getAge() {
        return age;
    }

    public void setAge(@NotNull Integer age) {
        this.age = age;
    }

    public @NotNull String getAnimal() {
        return animal;
    }

    public void setAnimal(@NotNull String animal) {
        this.animal = animal;
    }

    public Long getAccountNumber() {
        return bankAccount != null ? bankAccount.getAccountNumber() : null;
    }
}
