package com.example.testing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
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
    @ElementCollection
    @CollectionTable(name = "boarding_house_phone", joinColumns = @JoinColumn(name = "boarding_house_id"))
    @Column(name = "phone")
    private List<String> phone = new ArrayList<>();
    private String location;
    private String description;
    private String city;
    private String street;
    private Double price;
    private String email;
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;
    private String university;
    private String rentDuration;
    private Integer advancePayment;
    private String advancePaymentDuration;
    private String billsIncluded;
    @ElementCollection
    @CollectionTable(name = "boarding_house_facility", joinColumns = @JoinColumn(name = "boarding_house_id"))
    @Column(name = "facility")
    private List<String> facilities = new ArrayList<>();
    private Double distance;
    private Double latitude;
    private Double longitude;

    @OneToMany(mappedBy = "boardingHouse", cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "boarding_owner_id", nullable = false)
    private BoardingOwner boardingOwner;

    @OneToMany(mappedBy = "boardingHouse", cascade = CascadeType.ALL)
    private List<Room> rooms;


    public BoardingHouse(String city, String type, String phone, String location, String description, String email, Integer price, String street,  String image) {
        this.city = city;
        this.type = type;
        this.phone = Collections.singletonList(phone);
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
        this.phone = Collections.singletonList(phone);
        this.location = location;
        this.description = description;
        this.email = email;
        this.price = Double.valueOf(price);
        this.street = street;
        this.boardingOwner = boardingOwner; // Set the boarding owner
    }

}
