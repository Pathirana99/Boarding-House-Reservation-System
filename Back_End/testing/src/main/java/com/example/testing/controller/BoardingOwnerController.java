package com.example.testing.controller;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.service.BoardingHouseService;
import com.example.testing.service.BoardingOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owner")
public class BoardingOwnerController {
    @Autowired
    BoardingOwnerService service;
    @Autowired
    BoardingHouseService houseService;


    @PostMapping("/saveOwnerWithHousesAndRooms/{loginUserId}")
    public ResponseEntity<?> saveOwnerWithHousesAndRooms(
            @PathVariable Integer loginUserId,
            @RequestBody BoardingOwnerDto ownerDto) {
        try {
            BoardingOwner savedOwner = service.saveOwnerWithHousesAndRooms(loginUserId, ownerDto);
            return new ResponseEntity<>(savedOwner, HttpStatus.CREATED);
        } catch (Exception e) {
            // Log the error message and stack trace
            e.printStackTrace();
            return new ResponseEntity<>("Error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{ownerId}/houses")
    public List<BoardingHouseDto> getBoardingHousesByOwner(@PathVariable Integer ownerId) {
        return service.getBoardingHousesByOwner(ownerId);
    }

}