package com.sparta.tp.bankoftam.entities;

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
    private String username;

    @NotNull
    private Integer age;

    @NotNull
    private String animal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
