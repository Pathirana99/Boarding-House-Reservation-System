package com.example.testing.controller;

import com.example.testing.dto.ChatDto;
import com.example.testing.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<ChatDto> sendMessage(@RequestBody ChatDto chatDto) {
        ChatDto savedMessage = chatService.saveMessage(chatDto.getSenderId(), chatDto.getReceiverId(), chatDto.getMessage());
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ChatDto>> getChatHistory(
            @RequestParam Integer user1Id,
            @RequestParam Integer user2Id) {

        List<ChatDto> chatHistory = chatService.getChatHistory(user1Id, user2Id);
        return ResponseEntity.ok(chatHistory);
    }
}
