package com.sparta.tp.bankoftam.controller;

import com.sparta.tp.bankoftam.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/bank-accounts")
public class BankAccountController {

    private final BankAccountService bankAccountService;

    @Autowired
    public BankAccountController(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }

    @PostMapping("/transfer")
    public ResponseEntity<Void> transferMoney(
            @RequestParam Long from,
            @RequestParam Long to,
            @RequestParam double amount){
        bankAccountService.transferMoney(from, to, amount);
        return ResponseEntity.ok().build();
    }
}
