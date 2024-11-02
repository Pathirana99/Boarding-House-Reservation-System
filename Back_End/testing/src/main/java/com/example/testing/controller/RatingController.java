package com.example.testing.controller;

import com.example.testing.entity.Rating;
import com.example.testing.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    // Endpoint to submit a rating
    @PostMapping("/submit")
    public ResponseEntity<Rating> submitRating(@RequestBody Rating rating) {
        Rating savedRating = ratingService.saveRating(rating);
        return ResponseEntity.ok(savedRating);
    }

    // Endpoint to get ratings for a specific boarding house
    @GetMapping("/boardingHouse/{boardingHouseId}")
    public ResponseEntity<List<Rating>> getRatingsByBoardingHouseId(@PathVariable Integer boardingHouseId) {
        List<Rating> ratings = ratingService.getRatingsByBoardingHouseId(boardingHouseId);
        return ResponseEntity.ok(ratings);
    }
}
