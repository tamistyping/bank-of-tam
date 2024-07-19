package com.sparta.tp.bankoftam.service;

import com.sparta.tp.bankoftam.entities.BankAccountEntity;
import com.sparta.tp.bankoftam.entities.UserEntity;
import com.sparta.tp.bankoftam.exception.UserNotFoundException;
import com.sparta.tp.bankoftam.repository.BankAccountRepository;
import com.sparta.tp.bankoftam.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;

    @Autowired
    public UserService(UserRepository userRepository, BankAccountRepository bankAccountRepository) {
        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
    }

    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    public UserEntity getUserById(Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
    }

    @Transactional
    public UserEntity createUser(UserEntity userEntity){
        BankAccountEntity bankAccountEntity = new BankAccountEntity();
        bankAccountRepository.save(bankAccountEntity);

        userEntity.setBankAccount(bankAccountEntity);
        return userRepository.save(userEntity);
    }

    public UserEntity updateUser(UserEntity userEntity, Long id){
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
        user.setUsername(userEntity.getUsername());
        user.setAge(userEntity.getAge());
        user.setAnimal(userEntity.getAnimal());
        return userRepository.save(user);
    }

    public void deleteUser(Long id){
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
        userRepository.delete(user);
    }

    public void deleteAllUsers() {
        userRepository.deleteAll();
    }
}
