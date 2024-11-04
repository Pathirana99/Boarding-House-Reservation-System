package com.example.testing.dto;

import com.example.testing.entity.Facility;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class BoardingHouseDto {
    private Integer id;
    private String title;
    private String type;
    private String phone;
    private String location;
    private String description;
    private String city;
    private String street;
    private Double price;
    private String image;
    private String email;
   // private List<FacilityDto> facilities;
    private List<RoomDto> rooms;
    private List<FacilityDto> facilities = new ArrayList<>();


    public BoardingHouseDto(Integer id, String city, String type, String phone, String location, String description, String email, Integer price, String street, Object image) {
    }
    public BoardingHouseDto(Integer id, String city, String type, String phone, String location,
                            String description, String email, Double price, String street, String image) {
        this.id = id;
        this.city = city;
        this.type = type;
        this.phone = phone;
        this.location = location;
        this.description = description;
        this.email = email;
        this.price = price;
        this.street = street;
        this.image = image;
    }

    public BoardingHouseDto(String title, String type, String phone, String location, String description, String city, String street, Double price, String image, String email, List<RoomDto> rooms, List<FacilityDto> facilities) {
        this.title = title;
        this.type = type;
        this.phone = phone;
        this.location = location;
        this.description = description;
        this.city = city;
        this.street = street;
        this.price = price;
        this.image = image;
        this.email = email;
        this.rooms = rooms;
        this.facilities = facilities;
    }
}
