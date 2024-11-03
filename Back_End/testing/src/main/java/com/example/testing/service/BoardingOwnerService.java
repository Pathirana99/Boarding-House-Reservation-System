package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.dto.FacilityDto;
import com.example.testing.dto.RoomDto;
import com.example.testing.entity.*;
import com.example.testing.repo.*;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class BoardingOwnerService {
    @Autowired
    LoginUserRepo loginUserRepo;
    @Autowired
    BoardingOwnerRepo boardingOwnerRepo;
    @Autowired
    BoardingHouseRepo boardingHouseRepo;
    @Autowired
    RoomRepo roomRepo;
    @Autowired
    FacilityRepo facilityRepo;

    //private final LoginUserRepo loginUserRepo;

    public BoardingOwnerService(BoardingOwnerRepo boardingOwnerRepo, LoginUserRepo loginUserRepo) {
        this.boardingOwnerRepo = boardingOwnerRepo;
        this.loginUserRepo = loginUserRepo;
    }

    public BoardingOwner saveOwnerWithHousesAndRooms(Integer loginUserId, BoardingOwnerDto dto) {
        LoginUser loginUser = loginUserRepo.findById(loginUserId)
                .orElseThrow(() -> new RuntimeException("LoginUser not found"));

        BoardingOwner owner = new BoardingOwner();
        owner.setName(dto.getName());
        owner.setEmail(dto.getEmail());
        owner.setLoginUser(loginUser);

        List<BoardingHouse> boardingHouses = dto.getBoardingHouses().stream().map(bhDto -> {
            BoardingHouse house = new BoardingHouse();
            house.setTitle(bhDto.getTitle());
            house.setType(bhDto.getType());
            house.setPhone(bhDto.getPhone());
            house.setLocation(bhDto.getLocation());
            house.setDescription(bhDto.getDescription());
            house.setCity(bhDto.getCity());
            house.setStreet(bhDto.getStreet());
            house.setPrice(bhDto.getPrice());
            house.setEmail(bhDto.getEmail());
            house.setTimestamp(bhDto.getTimestamp());
            house.setUniversity(bhDto.getUniversity());
            house.setRentDuration(bhDto.getRentDuration());
            house.setAdvancePayment(bhDto.getAdvancePayment());
            house.setAdvancePaymentDuration(bhDto.getAdvancePaymentDuration());
            house.setBillsIncluded(bhDto.getBillsIncluded());
            house.setFacilities(bhDto.getFacilities());
            house.setDistance(bhDto.getDistance());
            house.setLatitude(bhDto.getLatitude());
            house.setLongitude(bhDto.getLongitude());
            house.setBoardingOwner(owner);

            List<Room> rooms = bhDto.getRooms().stream().map(roomDto -> {
                Room room = new Room();
                room.setTitle(roomDto.getTitle());
                room.setCapacity(String.valueOf(roomDto.getCapacity()));
                room.setIsAvailable(roomDto.getIsAvailable());
                room.setBoardingHouse(house);
                return room;
            }).collect(Collectors.toList());

            house.setRooms(rooms);
            return house;
        }).collect(Collectors.toList());

        owner.setBoardingHouses(boardingHouses);
        return boardingOwnerRepo.save(owner);
    }
    public List<BoardingHouseDto> getBoardingHousesByOwner(Integer ownerId) {
        List<BoardingHouse> boardingHouses = boardingHouseRepo.findByBoardingOwnerId(ownerId);
        return boardingHouses.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public BoardingOwner saveBoardingOwner(BoardingOwnerDto ownerDto) {
        BoardingOwner boardingOwner = new BoardingOwner();
        boardingOwner.setName(ownerDto.getName());
        boardingOwner.setEmail(ownerDto.getEmail());
        // Assuming the password is handled in a secure manner, like hashing
        boardingOwner.setPassword(ownerDto.getPassword());

        return boardingOwnerRepo.save(boardingOwner);
    }

    private BoardingHouseDto convertToDto(BoardingHouse boardingHouse) {
        BoardingHouseDto dto = new BoardingHouseDto();
        dto.setTitle(boardingHouse.getTitle());
        dto.setType(boardingHouse.getType());
        dto.setPhone(boardingHouse.getPhone());
        dto.setLocation(boardingHouse.getLocation());
        dto.setDescription(boardingHouse.getDescription());
        dto.setCity(boardingHouse.getCity());
        dto.setStreet(boardingHouse.getStreet());
        dto.setPrice(boardingHouse.getPrice());
        dto.setEmail(boardingHouse.getEmail());
        dto.setTimestamp(boardingHouse.getTimestamp());
        dto.setUniversity(boardingHouse.getUniversity());
        dto.setRentDuration(boardingHouse.getRentDuration());
        dto.setAdvancePayment(boardingHouse.getAdvancePayment());
        dto.setAdvancePaymentDuration(boardingHouse.getAdvancePaymentDuration());
        dto.setBillsIncluded(boardingHouse.getBillsIncluded());
        dto.setFacilities(boardingHouse.getFacilities());
        dto.setDistance(boardingHouse.getDistance());
        dto.setLatitude(boardingHouse.getLatitude());
        dto.setLongitude(boardingHouse.getLongitude());

        return dto;
    }
    public long countAllOwners() {
        return boardingOwnerRepo.count();
    }
}
