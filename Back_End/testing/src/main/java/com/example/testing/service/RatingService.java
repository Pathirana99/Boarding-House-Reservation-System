package com.example.testing.service;

import com.example.testing.dto.RatingDto;
import com.example.testing.entity.Rating;
import com.example.testing.repo.RatingRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {

    private final RatingRepo ratingRepo;

    public RatingService(RatingRepo ratingRepo) {
        this.ratingRepo = ratingRepo;
    }

    public Rating saveRating(Rating rating) {
        return ratingRepo.save(rating);
    }

    public List<RatingDto> getRatingsByBoardingHouseId(Integer boardingHouseId) {
        List<Rating> ratings = ratingRepo.findByBoardingHouseId(boardingHouseId);
        return ratings.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<RatingDto> getRatingsByUserId(Integer userId) {
        List<Rating> ratings = ratingRepo.findByUserId(userId);
        return ratings.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private RatingDto convertToDto(Rating rating) {
        RatingDto.BoardingHouseInfo boardingHouseInfo = new RatingDto.BoardingHouseInfo(
                rating.getBoardingHouse().getId(),
                rating.getBoardingHouse().getTitle(),
                rating.getBoardingHouse().getLocation(),
                rating.getBoardingHouse().getCity(),
                rating.getBoardingHouse().getPrice()
        );

        RatingDto.UserInfo userInfo = new RatingDto.UserInfo(
                rating.getUser().getId(),
                rating.getUser().getEmail(),
                rating.getUser().getRole()
        );

        return new RatingDto(
                rating.getId(),
                rating.getUserRating(),
                rating.getStayStatus(),
                rating.getFullname(),
                boardingHouseInfo,
                userInfo
        );
    }
}
