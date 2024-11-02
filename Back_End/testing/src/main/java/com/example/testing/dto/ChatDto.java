package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {
    private Integer senderId;
    private Integer receiverId;
    private String message;
    private Date timestamp;
}
