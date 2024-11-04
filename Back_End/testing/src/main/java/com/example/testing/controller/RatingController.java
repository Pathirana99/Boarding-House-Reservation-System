package com.example.testing.controller;

import com.example.testing.dto.RatingDto;
import com.example.testing.entity.Rating;
import com.example.testing.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping("/submit")
    public ResponseEntity<Rating> submitRating(@RequestBody Rating rating) {
        Rating savedRating = ratingService.saveRating(rating);
        return ResponseEntity.ok(savedRating);
    }

    @GetMapping("/boardingHouse/{boardingHouseId}")
    public ResponseEntity<List<RatingDto>> getRatingsByBoardingHouseId(@PathVariable Integer boardingHouseId) {
        List<RatingDto> ratings = ratingService.getRatingsByBoardingHouseId(boardingHouseId);
        return ResponseEntity.ok(ratings);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RatingDto>> getRatingsByUserId(@PathVariable Integer userId) {
        List<RatingDto> ratings = ratingService.getRatingsByUserId(userId);
        return ResponseEntity.ok(ratings);
    }
}
