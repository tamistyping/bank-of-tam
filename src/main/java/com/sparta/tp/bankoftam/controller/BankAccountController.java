package com.sparta.tp.bankoftam.controller;

import com.sparta.tp.bankoftam.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/bank-accounts")
public class BankAccountController {

    private final BankAccountService bankAccountService;

    @Autowired
    public BankAccountController(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }

    @PostMapping("/transfer")
    public ResponseEntity<Double> transferMoney(
            @RequestParam Long from,
            @RequestParam Long to,
            @RequestParam double amount){
        double newBalance = bankAccountService.transferMoney(from, to, amount);
        return ResponseEntity.ok(newBalance);
    }

    @PutMapping("/{accountNumber}/deposit")
    public double deposit(@PathVariable Long accountNumber, @RequestParam double amount) {
        return bankAccountService.deposit(accountNumber, amount);
    }

    @PutMapping("/{accountNumber}/withdraw")
    public double withdraw(@PathVariable Long accountNumber, @RequestParam double amount) {
        return bankAccountService.withdraw(accountNumber, amount);
    }
}
