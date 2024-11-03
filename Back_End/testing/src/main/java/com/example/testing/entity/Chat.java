package com.example.testing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private LoginUser sender;

    @ManyToOne
    @JoinColumn(name = "boarding_house_id")
    private BoardingHouse boardingHouse;

    private String message;

    private LocalDateTime timestamp = LocalDateTime.now();

    public Chat(LoginUser sender, BoardingHouse boardingHouse, String message) {
        this.sender = sender;
        this.boardingHouse = boardingHouse;
        this.message = message;
    }
}
