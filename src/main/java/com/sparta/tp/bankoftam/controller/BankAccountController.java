package com.sparta.tp.bankoftam.controller;

import com.sparta.tp.bankoftam.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/balance/{accountNumber}")
    public ResponseEntity<Double> getBalance(@PathVariable String accountNumber) {
        try {
            Long accountNumberLong = Long.parseLong(accountNumber);

            double balance = bankAccountService.getBalance(accountNumberLong);
            return new ResponseEntity<>(balance, HttpStatus.OK);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
