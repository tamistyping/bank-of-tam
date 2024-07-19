package com.sparta.tp.bankoftam.service;

import com.sparta.tp.bankoftam.entities.BankAccountEntity;
import com.sparta.tp.bankoftam.exception.BankAccountNotFoundException;
import com.sparta.tp.bankoftam.repository.BankAccountRepository;
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
}
