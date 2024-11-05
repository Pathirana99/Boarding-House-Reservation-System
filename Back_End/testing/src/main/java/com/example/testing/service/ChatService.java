package com.example.testing.service;

import com.example.testing.dto.ChatDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.Chat;
import com.example.testing.entity.LoginUser;
import com.example.testing.repo.BoardingHouseRepo;
import com.example.testing.repo.ChatRepo;
import com.example.testing.repo.LoginUserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatRepo chatRepo;
    private final LoginUserRepo loginUserRepo;
    private final BoardingHouseRepo boardingHouseRepo;

    public ChatService(ChatRepo chatRepo, LoginUserRepo loginUserRepo, BoardingHouseRepo boardingHouseRepo) {
        this.chatRepo = chatRepo;
        this.loginUserRepo = loginUserRepo;
        this.boardingHouseRepo = boardingHouseRepo;
    }

    public ChatDto saveMessage(Integer senderId, Integer boardingHouseId, String message) {
        LoginUser sender = loginUserRepo.findById(senderId).orElseThrow(() -> new RuntimeException("User not found"));
        BoardingHouse boardingHouse = boardingHouseRepo.findById(boardingHouseId).orElseThrow(() -> new RuntimeException("Boarding house not found"));

        Chat chat = new Chat(sender, boardingHouse, message);
        chatRepo.save(chat);

        return new ChatDto(chat.getId(), senderId, boardingHouseId, message, chat.getTimestamp());
    }

    public List<ChatDto> getAllChats() {
        List<Chat> chats = chatRepo.findAll();

        return chats.stream()
                .map(chat -> {
                    Integer senderId = chat.getSender() != null ? chat.getSender().getId() : null;
                    Integer boardingHouseId = chat.getBoardingHouse() != null ? chat.getBoardingHouse().getId() : null;
                    return new ChatDto(chat.getId(), senderId, boardingHouseId, chat.getMessage(), chat.getTimestamp());
                })
                .collect(Collectors.toList());
    }


    public List<ChatDto> getChatHistoryByUserId(Integer userId) {
        LoginUser user = loginUserRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return chatRepo.findBySender(user).stream()
                .map(chat -> {
                    Integer senderId = chat.getSender() != null ? chat.getSender().getId() : null;
                    Integer boardingHouseId = chat.getBoardingHouse() != null ? chat.getBoardingHouse().getId() : null;
                    return new ChatDto(chat.getId(), senderId, boardingHouseId, chat.getMessage(), chat.getTimestamp());
                })
                .collect(Collectors.toList());
    }

}
