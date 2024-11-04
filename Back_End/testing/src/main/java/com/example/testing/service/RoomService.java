package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.RoomDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.entity.Room;
import com.example.testing.repo.BoardingHouseRepo;
import com.example.testing.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class RoomService {
    @Autowired
    RoomRepo roomRepo;
    @Autowired
    BoardingHouseRepo boardingHouseRepo;

    public RoomDto saveRoom(RoomDto roomDto, Integer boardingHouseId) {
        BoardingHouse boardingHouse = boardingHouseRepo.findById(boardingHouseId)
                .orElseThrow(() -> new RuntimeException("BoardingHouse not found"));

        Room room = new Room();
        room.setTitle(roomDto.getTitle());
        room.setCapacity(roomDto.getCapacity());
        room.setIsavailable(roomDto.getIsavailable());
        room.setBoardingHouse(boardingHouse);

        Room savedRoom = roomRepo.save(room);

        return new RoomDto(
                savedRoom.getId(),
                savedRoom.getTitle(),
                savedRoom.getCapacity(),
                savedRoom.getIsavailable()
        );
    }
    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomRepo.findAll();
        return rooms.stream()
                .map(room -> new RoomDto(room.getId(), room.getTitle(), room.getCapacity(), room.getIsavailable()))
                .collect(Collectors.toList());
    }
    public Optional<Room> getRoomById(Integer id) {
        return roomRepo.findById(id);
    }

    public Room updateRoom(Integer id, Room roomDetails) {
        Room room = roomRepo.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        room.setTitle(roomDetails.getTitle());
        room.setCapacity(roomDetails.getCapacity());
        room.setIsavailable(roomDetails.getIsavailable());
        room.setBoardingHouse(roomDetails.getBoardingHouse());
        return roomRepo.save(room);
    }

    public void deleteRoom(Integer id) {
        Room room = roomRepo.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        roomRepo.delete(room);
    }

}
