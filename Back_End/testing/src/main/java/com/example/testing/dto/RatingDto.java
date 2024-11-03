package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RatingDto {
    private Integer id;
    private Integer userRating;
    private String stayStatus;
    private String fullname;

    private BoardingHouseInfo boardingHouse;
    private UserInfo user;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BoardingHouseInfo {
        private Integer id;
        private String title;
        private String location;
        private String city;
        private Double price;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInfo {
        private Integer id;
        private String email;
        private String role;
    }
}