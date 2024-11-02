package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class BoardingOwnerDto {
    private Integer id;
    private String name;
    private String email;
    private String password;

    private Integer loginUserId;

    private List<BoardingHouseDto> boardingHouses;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<BoardingHouseDto> getBoardingHouses() {
        return boardingHouses;
    }

    public void setBoardingHouses(List<BoardingHouseDto> boardingHouses) {
        this.boardingHouses = boardingHouses;
    }
}
