package com.sparta.tp.bankoftam;


import com.sparta.tp.bankoftam.entities.BankAccountEntity;
import com.sparta.tp.bankoftam.entities.UserEntity;
import com.sparta.tp.bankoftam.exception.UserNotFoundException;
import com.sparta.tp.bankoftam.repository.BankAccountRepository;
import com.sparta.tp.bankoftam.repository.UserRepository;
import com.sparta.tp.bankoftam.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
    @Mock
    private UserRepository userRepository;

    @Mock
    private BankAccountRepository bankAccountRepository;

    @InjectMocks
    private UserService userService;

    private UserEntity user;
    private BankAccountEntity bankAccount;

    @BeforeEach
    void setUp() {
        bankAccount = new BankAccountEntity();
        user = new UserEntity();
        user.setId(1L);
        user.setUsername("testUser");
        user.setAge(25);
        user.setAnimal("cat");
        user.setBankAccount(bankAccount);
    }

    @Test
    void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(user));
        List<UserEntity> users = userService.getAllUsers();
        assertEquals(1, users.size());
        assertEquals(user.getUsername(), users.get(0).getUsername());
    }

    @Test
    void testGetUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        UserEntity foundUser = userService.getUserById(1L);
        assertEquals(user.getUsername(), foundUser.getUsername());
    }

    @Test
    void testGetUserById_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(1L));
    }

    @Test
    void testCreateUser() {
        when(bankAccountRepository.save(any(BankAccountEntity.class))).thenReturn(bankAccount);
        when(userRepository.save(any(UserEntity.class))).thenReturn(user);
        UserEntity createdUser = userService.createUser(user);
        assertNotNull(createdUser.getBankAccount());
        assertEquals(user.getUsername(), createdUser.getUsername());
    }

    @Test
    void testUpdateUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(UserEntity.class))).thenReturn(user);

        UserEntity updatedUser = new UserEntity();
        updatedUser.setUsername("updatedUser");
        updatedUser.setAge(30);
        updatedUser.setAnimal("dog");

        UserEntity result = userService.updateUser(updatedUser, 1L);
        assertEquals("updatedUser", result.getUsername());
        assertEquals(30, result.getAge());
        assertEquals("dog", result.getAnimal());
    }

    @Test
    void testUpdateUser_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        UserEntity updatedUser = new UserEntity();
        assertThrows(UserNotFoundException.class, () -> userService.updateUser(updatedUser, 1L));
    }

    @Test
    void testDeleteUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        doNothing().when(userRepository).delete(user);
        userService.deleteUser(1L);
        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void testDeleteUser_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.deleteUser(1L));
    }

    @Test
    void testDeleteAllUsers() {
        doNothing().when(userRepository).deleteAll();
        userService.deleteAllUsers();
        verify(userRepository, times(1)).deleteAll();
    }

    @Test
    void testGetUserByUsername() {
        when(userRepository.findByUsername("testUser")).thenReturn(user);
        UserEntity foundUser = userService.getUserByUsername("testUser");
        assertEquals("testUser", foundUser.getUsername());
    }

}
