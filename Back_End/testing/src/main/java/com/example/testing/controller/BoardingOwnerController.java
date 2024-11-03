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


    public BoardingOwnerController(BoardingOwnerService boardingOwnerService) {
        this.service = boardingOwnerService;
    }

    @PostMapping("/save/{loginUserId}")
    public ResponseEntity<BoardingOwner> saveOwnerWithHousesAndRooms(
            @PathVariable Integer loginUserId,
            @RequestBody BoardingOwnerDto dto) {
        BoardingOwner savedOwner = service.saveOwnerWithHousesAndRooms(loginUserId, dto);
        return ResponseEntity.ok(savedOwner);
    }

    @GetMapping("/{ownerId}/houses")
    public ResponseEntity<List<BoardingHouseDto>> getBoardingHousesByOwner(@PathVariable Integer ownerId) {
        List<BoardingHouseDto> boardingHouses = service.getBoardingHousesByOwner(ownerId);
        return ResponseEntity.ok(boardingHouses);
    }

    @PostMapping("/saveOwner")
    public ResponseEntity<BoardingOwner> saveBoardingOwner(@RequestBody BoardingOwnerDto ownerDto) {
        try {
            BoardingOwner savedOwner = service.saveBoardingOwner(ownerDto);
            return new ResponseEntity<>(savedOwner, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/count")
    public long countAllOwners() {
        return service.countAllOwners();
    }
}