package com.example.testing.service;

import com.example.testing.entity.Rating;
import com.example.testing.repo.RatingRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    private final RatingRepo ratingRepo;

    public RatingService(RatingRepo ratingRepo) {
        this.ratingRepo = ratingRepo;
    }

    // Method to save a rating
    public Rating saveRating(Rating rating) {
        return ratingRepo.save(rating);
    }

    // Method to retrieve ratings for a specific boarding house
    public List<Rating> getRatingsByBoardingHouseId(Integer boardingHouseId) {
        return ratingRepo.findByBoardingHouseId(boardingHouseId);
    }
}
