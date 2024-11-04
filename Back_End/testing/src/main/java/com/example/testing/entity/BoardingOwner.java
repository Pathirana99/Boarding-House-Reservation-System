package com.example.testing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity

public class BoardingOwner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String password;


    @OneToMany(mappedBy = "boardingOwner", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<BoardingHouse> boardingHouses;

    @OneToOne
    @JoinColumn(name = "login_user_id", nullable = false)
    private LoginUser loginUser;

    public BoardingOwner(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    public void addBoardingHouse(BoardingHouse boardingHouse) {
        boardingHouses.add(boardingHouse);
        boardingHouse.setBoardingOwner(this);
    }

    public void removeBoardingHouse(BoardingHouse boardingHouse) {
        boardingHouses.remove(boardingHouse);
        boardingHouse.setBoardingOwner(null);
    }

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

    public List<BoardingHouse> getBoardingHouses() {
        return boardingHouses;
    }

    public void setBoardingHouses(List<BoardingHouse> boardingHouses) {
        this.boardingHouses = boardingHouses;
    }
}
