package com.example.testing.dto;

import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.LoginUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatDto {
    private Integer id;
    private LoginUser sender;
    private BoardingHouse boardingHouse;
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    public ChatDto(Integer senderId, Integer boardingHouseId, String message, LocalDateTime timestamp) {
    }
}
