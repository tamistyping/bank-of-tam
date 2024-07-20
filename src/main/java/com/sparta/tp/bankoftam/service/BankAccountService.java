package com.sparta.tp.bankoftam.service;

import com.sparta.tp.bankoftam.entities.BankAccountEntity;
import com.sparta.tp.bankoftam.exception.BankAccountNotFoundException;
import com.sparta.tp.bankoftam.repository.BankAccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class BankAccountService {

    private final BankAccountRepository bankAccountRepository;

    public BankAccountService(BankAccountRepository bankAccountRepository) {
        this.bankAccountRepository = bankAccountRepository;
    }

    public BankAccountEntity getBankAccountById(Long accountNumber) {
        return bankAccountRepository.findById(accountNumber)
                .orElseThrow(() -> new BankAccountNotFoundException("Bank account not found with number " + accountNumber));
    }

    public double getBalance(Long accountNumber) {
        BankAccountEntity account = getBankAccountById(accountNumber);
        return account.getBalance();
    }

    @Transactional
    public double deposit(Long accountNumber, double amount) {
        BankAccountEntity account = getBankAccountById(accountNumber);
        account.deposit(amount);
        bankAccountRepository.save(account);
        return account.getBalance();
    }

    @Transactional
    public double withdraw(Long accountNumber, double amount) {
        BankAccountEntity account = getBankAccountById(accountNumber);
        account.withdraw(amount);
        bankAccountRepository.save(account);
        return account.getBalance();
    }

    @Transactional
    public double transferMoney(Long from, Long to, double amount){

        BankAccountEntity fromAccount = getBankAccountById(from);
        BankAccountEntity toAccount = getBankAccountById(to);

        fromAccount.withdraw(amount);
        toAccount.deposit(amount);

        bankAccountRepository.save(fromAccount);
        bankAccountRepository.save(toAccount);

        return fromAccount.getBalance();
    }
}
