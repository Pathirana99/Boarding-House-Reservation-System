package com.example.testing.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data

public class ChatDto {
    @JsonProperty("chatId")
    private Integer id;
    private Integer userId;  // Or appropriate user identifier
    private Integer boardingHouseId;  // Assuming this is the association
    @JsonProperty("chatMessage")
    private String message;
    private LocalDateTime timestamp;

    public ChatDto(Integer id, Integer userId, Integer boardingHouseId, String message, LocalDateTime timestamp) {
        this.id = id;
        this.userId = userId;
        this.boardingHouseId = boardingHouseId;
        this.message = message;
        this.timestamp = timestamp;
    }
    public ChatDto(Integer userId, Integer boardingHouseId, String message) {
        this.userId = userId;
        this.boardingHouseId = boardingHouseId;
        this.message = message;
        this.timestamp = LocalDateTime.now(); // Automatically set to now
    }

    public ChatDto(Integer id, Integer boardingHouseId, String message, LocalDateTime timestamp) {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBoardingHouseId() {
        return boardingHouseId;
    }

    public void setBoardingHouseId(Integer boardingHouseId) {
        this.boardingHouseId = boardingHouseId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
