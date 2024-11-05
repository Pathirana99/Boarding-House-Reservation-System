package com.example.testing.entity;

import com.example.testing.dto.FacilityDto;
import com.example.testing.dto.RoomDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class BoardingHouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String type;
    private String phone;
    private String location;
    private String description;
    private String city;
    private String street;
    private Double price;
    private String email;

    @OneToMany(mappedBy = "boardingHouse", cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "boarding_owner_id", nullable = false)
    private BoardingOwner boardingOwner;

    @OneToMany(mappedBy = "boardingHouse", cascade = CascadeType.ALL)
    private List<Room> rooms;

    @OneToMany(mappedBy = "boardingHouse", cascade = CascadeType.ALL)
    private List<Facility> facilities = new ArrayList<>();

    public BoardingHouse(String city, String type, String phone, String location, String description, String email, Integer price, String street,  String image) {
        this.city = city;
        this.type = type;
        this.phone = phone;
        this.location = location;
        this.description = description;
        this.email = email;
        this.price = Double.valueOf(price);
        this.street = street;
    }

    public BoardingHouse(Integer id, String city, String type, String phone, String location,
                         String description, String email, Integer price, String street, String image) {
    }
    public BoardingHouse(String city, String type, String phone, String location, String description,
                         String email, Integer price, String street, String image, BoardingOwner boardingOwner) {
        this.city = city;
        this.type = type;
        this.phone = phone;
        this.location = location;
        this.description = description;
        this.email = email;
        this.price = Double.valueOf(price);
        this.street = street;
        this.boardingOwner = boardingOwner;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BoardingOwner getBoardingOwner() {
        return boardingOwner;
    }

    public void setBoardingOwner(BoardingOwner boardingOwner) {
        this.boardingOwner = boardingOwner;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public void setImage(String image) {
    }

    public Object getImage() {

        return null;
    }
}
