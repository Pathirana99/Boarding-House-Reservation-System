package com.example.testing.repo;

import com.example.testing.entity.BoardingOwner;
import com.example.testing.entity.Chat;
import com.example.testing.entity.LoginUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepo extends JpaRepository<Chat, Integer> {
    List<Chat> findBySenderAndReceiver(LoginUser sender, BoardingOwner receiver);
    List<Chat> findByReceiverAndSender(BoardingOwner receiver, LoginUser sender);
}