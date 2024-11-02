package com.example.testing.service;

import com.example.testing.dto.ChatDto;
import com.example.testing.entity.Chat;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.entity.LoginUser;
import com.example.testing.repo.BoardingOwnerRepo;
import com.example.testing.repo.ChatRepo;
import com.example.testing.repo.LoginUserRepo;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatRepo chatRepository;
    private final LoginUserRepo loginUserRepository;
    private final BoardingOwnerRepo boardingOwnerRepository;

    public ChatService(ChatRepo chatRepository, LoginUserRepo loginUserRepository, BoardingOwnerRepo boardingOwnerRepository) {
        this.chatRepository = chatRepository;
        this.loginUserRepository = loginUserRepository;
        this.boardingOwnerRepository = boardingOwnerRepository;
    }

    public ChatDto saveMessage(Integer senderId, Integer receiverId, String message) {
        LoginUser sender = loginUserRepository.findById(senderId).orElse(null);
        BoardingOwner receiver = boardingOwnerRepository.findById(receiverId).orElse(null);

        if (sender == null || receiver == null) return null;

        Chat chat = new Chat(message, new Date(), sender, receiver);
        Chat savedChat = chatRepository.save(chat);

        // Return saved chat details as ChatDto
        return new ChatDto(savedChat.getSender().getId(), savedChat.getReceiver().getId(), savedChat.getMessage(), savedChat.getTimestamp());
    }

    public List<ChatDto> getChatHistory(Integer user1Id, Integer user2Id) {
        LoginUser user1 = loginUserRepository.findById(user1Id).orElse(null);
        BoardingOwner user2 = boardingOwnerRepository.findById(user2Id).orElse(null);

        if (user1 == null || user2 == null) return List.of();

        List<Chat> chats = chatRepository.findBySenderAndReceiver(user1, user2);
        chats.addAll(chatRepository.findByReceiverAndSender(user2, user1));

        return chats.stream()
                .map(chat -> new ChatDto(chat.getSender().getId(), chat.getReceiver().getId(), chat.getMessage(), chat.getTimestamp()))
                .collect(Collectors.toList());
    }
}
