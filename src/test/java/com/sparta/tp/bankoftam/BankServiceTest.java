package com.sparta.tp.bankoftam;

import com.sparta.tp.bankoftam.entities.BankAccountEntity;
import com.sparta.tp.bankoftam.exception.BankAccountNotFoundException;
import com.sparta.tp.bankoftam.repository.BankAccountRepository;
import com.sparta.tp.bankoftam.service.BankAccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BankServiceTest {

    @Mock
    private BankAccountRepository bankAccountRepository;

    @InjectMocks
    private BankAccountService bankAccountService;

    private BankAccountEntity account;
    private BankAccountEntity toAccount;

    @BeforeEach
    void setUp() {
        account = new BankAccountEntity();
        account.setAccountNumber(1L);
        account.setBalance(1000.0);

        toAccount = new BankAccountEntity();
        toAccount.setAccountNumber(2L);
        toAccount.setBalance(500.0);
    }

    @Test
    void testGetBankAccountById() {
        when(bankAccountRepository.findById(1L)).thenReturn(Optional.of(account));
        BankAccountEntity foundAccount = bankAccountService.getBankAccountById(1L);
        assertEquals(account.getAccountNumber(), foundAccount.getAccountNumber());
    }

    @Test
    void testGetBankAccountById_AccountNotFound() {
        when(bankAccountRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(BankAccountNotFoundException.class, () -> bankAccountService.getBankAccountById(1L));
    }

    @Test
    void testGetBalance() {
        when(bankAccountRepository.findById(1L)).thenReturn(Optional.of(account));
        double balance = bankAccountService.getBalance(1L);
        assertEquals(account.getBalance(), balance);
    }

    @Test
    void testDeposit() {
        when(bankAccountRepository.findById(1L)).thenReturn(Optional.of(account));
        when(bankAccountRepository.save(any(BankAccountEntity.class))).thenReturn(account);

        double newBalance = bankAccountService.deposit(1L, 500.0);
        assertEquals(1500.0, newBalance);
    }

    @Test
    void testWithdraw() {
        when(bankAccountRepository.findById(1L)).thenReturn(Optional.of(account));
        when(bankAccountRepository.save(any(BankAccountEntity.class))).thenReturn(account);

        double newBalance = bankAccountService.withdraw(1L, 500.0);
        assertEquals(500.0, newBalance);
    }

    @Test
    void testTransferMoney() {
        when(bankAccountRepository.findById(1L)).thenReturn(Optional.of(account));
        when(bankAccountRepository.findById(2L)).thenReturn(Optional.of(toAccount));
        when(bankAccountRepository.save(account)).thenReturn(account);
        when(bankAccountRepository.save(toAccount)).thenReturn(toAccount);

        double fromBalance = bankAccountService.transferMoney(1L, 2L, 200.0);

        assertEquals(800.0, fromBalance);
        assertEquals(700.0, toAccount.getBalance());
    }
}
