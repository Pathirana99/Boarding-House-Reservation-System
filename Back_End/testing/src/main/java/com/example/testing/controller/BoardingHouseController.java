package com.example.testing.controller;

import com.example.testing.dto.BoardingHouseDto;
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

    @PostMapping("/{ownerId}/houses")
    public BoardingHouseDto createBoardingHouse(@PathVariable Integer ownerId, @RequestBody BoardingHouseDto boardingHouseDto) {
        return service.saveBoardingHouse(boardingHouseDto, ownerId);
    }
    @GetMapping("/city/{city}")
    public List<BoardingHouseDto> getBoardingHousesByCity(@PathVariable String city) {
        return service.getBoardingHousesByCity(city);
    }
    @GetMapping("/getAllBoarding")
    public List<BoardingHouseDto> getAllBoardingHouses() {
        return service.getAllBoardingHouses();
    }
    @PutMapping("/{id}/updateBoarding")
    public ResponseEntity<Object> updateBoarding(@PathVariable Integer id, @RequestBody BoardingHouseDto boardingHouseDto) {
        BoardingHouseDto updatedBoardingHouseDto = service.updateBoarding(id, boardingHouseDto);

        if (updatedBoardingHouseDto != null) {
            return new ResponseEntity<>(updatedBoardingHouseDto, HttpStatus.OK);
        }
        return new ResponseEntity<>("Boarding House not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBoarding(@PathVariable Integer id){
        int i = service.deleteBoarding(id);
        if (i == 1){
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
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
