package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class BoardingHouseDto {
    private Integer id;
    private String title;
    private String type;
    private List<String> phone;
    private String location;
    private String description;
    private String city;
    private String street;
    private Double price;
    private String email;
    private Date timestamp;
    private String university;
    private String rentDuration;
    private Integer advancePayment;
    private String advancePaymentDuration;
    private String billsIncluded;
    private List<String> facilities;
    private Double distance;
    private Double latitude;
    private Double longitude;
    private BoardingOwnerInfo boardingOwner;
    private List<ImageInfo> images;
    private List<RoomInfo> rooms;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BoardingOwnerInfo {
        private Integer id;
        private String name;
        private String email;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ImageInfo {
        private Integer id;
        private String imageUrl; // Assuming you store URLs or paths for images
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomInfo {
        private Integer id;
        private String title;
        private Integer capacity;
        private Boolean isAvailable;
    }
}
