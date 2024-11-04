package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoomDto {
    private Integer id;
    private String title;
    private String capacity;
    private String isavailable;

    public RoomDto(String title, String capacity, String isavailable) {
        this.title = title;
        this.capacity = capacity;
        this.isavailable = isavailable;
    }
}
