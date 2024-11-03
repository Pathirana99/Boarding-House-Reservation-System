package com.example.testing.repo;

import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.Chat;
import com.example.testing.entity.LoginUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepo extends JpaRepository<Chat, Integer> {
    List<Chat> findByBoardingHouse(BoardingHouse boardingHouse);
    List<Chat> findBySenderOrBoardingHouse(LoginUser sender, BoardingHouse boardingHouse);
}