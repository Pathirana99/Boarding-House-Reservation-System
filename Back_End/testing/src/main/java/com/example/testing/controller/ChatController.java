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
    public ResponseEntity<ChatDto> sendMessage(@RequestParam Integer senderId, @RequestParam Integer boardingHouseId, @RequestBody String message) {
        ChatDto savedMessage = chatService.saveMessage(senderId, boardingHouseId, message);
        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ChatDto>> getAllChats() {
        return ResponseEntity.ok(chatService.getAllChats());
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<ChatDto>> getChatHistoryByUserId(@PathVariable Integer userId) {
        List<ChatDto> chatHistory = chatService.getChatHistoryByUserId(userId);
        return ResponseEntity.ok(chatHistory);
    }

}