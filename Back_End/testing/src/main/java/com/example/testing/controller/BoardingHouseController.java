package com.example.testing.controller;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.service.BoardingHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;


@RestController
@RequestMapping("/boardingHouse")
public class BoardingHouseController {
    @Autowired
    BoardingHouseService service;

    public void BoardingController(BoardingHouseService boardingHouseService) {
        this.service = boardingHouseService;
    }

    @PostMapping("/saveOwnerWithHousesAndRooms")
    public ResponseEntity<?> saveOwnerWithHousesAndRooms(@RequestBody BoardingOwnerDto ownerDto, @RequestBody List<BoardingHouseDto> boardingHouseDtos) {
        BoardingOwner savedOwner = service.saveOwnerWithHousesAndRooms(ownerDto, boardingHouseDtos, null);
        return ResponseEntity.ok(savedOwner);
    }

    @GetMapping("/getHousesByCity/{city}")
    public ResponseEntity<List<BoardingHouseDto>> getHousesByCity(@PathVariable String city) {
        List<BoardingHouseDto> houses = service.getBoardingHousesByCity(city);
        return ResponseEntity.ok(houses);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BoardingHouseDto> updateBoardingHouse(@PathVariable Integer id, @RequestBody BoardingHouseDto boardingHouseDto) {
        BoardingHouseDto updatedHouse = service.updateBoarding(id, boardingHouseDto);
        return ResponseEntity.ok(updatedHouse);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBoardingHouse(@PathVariable Integer id) {
        service.deleteBoardingHouse(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/allHouses")
    public ResponseEntity<List<BoardingHouseDto>> getAllHouses() {
        List<BoardingHouseDto> houses = service.getAllBoardingHouses();
        return ResponseEntity.ok(houses);
    }
    @PostMapping("/{boardingHouseId}/uploadImages")
    public ResponseEntity<String> uploadImages(@PathVariable Integer boardingHouseId,
                                               @RequestParam("files") MultipartFile[] files)
    {
        try {
            service.saveImages(boardingHouseId, files);
            return new ResponseEntity<>("Images uploaded successfully!", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload images: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{boardingHouseId}/images")
    public ResponseEntity<List<Path>> getImages(@PathVariable Integer boardingHouseId) {
        try {
            List<Path> imagePaths = service.getImages(boardingHouseId);
            return new ResponseEntity<>(imagePaths, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{boardingHouseId}/images/{imageName}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable Integer boardingHouseId,
                                                       @PathVariable String imageName) {
        try {
            FileSystemResource imageResource = service.getImageResource(boardingHouseId, imageName);
            if (imageResource != null) {
                return ResponseEntity.ok(imageResource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
