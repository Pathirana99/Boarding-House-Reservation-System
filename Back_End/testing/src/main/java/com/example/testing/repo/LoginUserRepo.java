package com.example.testing.repo;

import com.example.testing.entity.LoginUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoginUserRepo extends JpaRepository<LoginUser, Integer> {
    boolean existsLoginUserByEmail(String email);

    LoginUser findByEmail(String email);
    List<LoginUser> findByRoleNot(String role);
    long count();
}