package com.example.testing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String message;

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private LoginUser sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private BoardingOwner receiver;

    public Chat(String message, Date timestamp, LoginUser sender, BoardingOwner receiver) {
        this.message = message;
        this.timestamp = timestamp;
        this.sender = sender;
        this.receiver = receiver;
    }
}
