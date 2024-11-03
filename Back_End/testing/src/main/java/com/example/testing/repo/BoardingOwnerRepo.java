package com.example.testing.repo;

import com.example.testing.entity.BoardingOwner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardingOwnerRepo extends JpaRepository<BoardingOwner, Integer> {
    boolean existsByEmail(String email);
    long count();
}
