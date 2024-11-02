package com.example.testing.repo;

import com.example.testing.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepo extends JpaRepository<Rating, Integer> {
    List<Rating> findByBoardingHouseId(Integer boardingHouseId);
}