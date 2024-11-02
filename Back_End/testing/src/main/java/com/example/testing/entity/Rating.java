package com.example.testing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userRating;

    private String stayStatus;

    private String fullname;

    @ManyToOne
    @JoinColumn(name = "boarding_house_id", nullable = false)
    private BoardingHouse boardingHouse;

    @ManyToOne
    @JoinColumn(name = "login_user_id", nullable = false)
    private LoginUser user; // User who gave the rating
}
