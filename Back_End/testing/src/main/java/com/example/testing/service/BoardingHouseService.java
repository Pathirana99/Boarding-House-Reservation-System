package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.FacilityDto;
import com.example.testing.dto.RoomDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.entity.Image;
import com.example.testing.repo.BoardingHouseRepo;
import com.example.testing.repo.BoardingOwnerRepo;
import com.example.testing.repo.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BoardingHouseService {
    @Autowired
    BoardingHouseRepo boardingHouseRepo;

    @Autowired
    BoardingOwnerRepo boardingOwnerRepo;

    @Autowired
    ImageRepo imageRepo;

    public BoardingHouseDto saveBoardingHouse(BoardingHouseDto boardingHouseDTO, Integer ownerId) {
        BoardingOwner boardingOwner = boardingOwnerRepo.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        BoardingHouse boardingHouse = new BoardingHouse();
        boardingHouse.setTitle(boardingHouseDTO.getTitle());
        boardingHouse.setType(boardingHouseDTO.getType());
        boardingHouse.setPhone(boardingHouseDTO.getPhone());
        boardingHouse.setLocation(boardingHouseDTO.getLocation());
        boardingHouse.setDescription(boardingHouseDTO.getDescription());
        boardingHouse.setCity(boardingHouseDTO.getCity());
        boardingHouse.setStreet(boardingHouseDTO.getStreet());
        boardingHouse.setPrice(boardingHouseDTO.getPrice());
        boardingHouse.setBoardingOwner(boardingOwner);

        boardingHouse = boardingHouseRepo.save(boardingHouse);
        boardingHouseDTO.setId(boardingHouse.getId());
        return boardingHouseDTO;
    }
    public List<BoardingHouseDto> getBoardingHousesByCity(String city) {
        List<BoardingHouse> boardingHouses = boardingHouseRepo.findByCity(city);
        return boardingHouses.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<BoardingHouseDto> getAllBoardingHouses() {
        List<BoardingHouse> boardingHouses = boardingHouseRepo.findAll();
        return boardingHouses.stream().map(this::convertToDtoWithDetails).collect(Collectors.toList());
    }

    private BoardingHouseDto convertToDtoWithDetails(BoardingHouse boardingHouse) {
        BoardingHouseDto dto = new BoardingHouseDto();
        dto.setId(boardingHouse.getId());
        dto.setTitle(boardingHouse.getTitle());
        dto.setType(boardingHouse.getType());
        dto.setPhone(boardingHouse.getPhone());
        dto.setLocation(boardingHouse.getLocation());
        dto.setDescription(boardingHouse.getDescription());
        dto.setCity(boardingHouse.getCity());
        dto.setStreet(boardingHouse.getStreet());
        dto.setPrice(boardingHouse.getPrice());
        dto.setEmail(boardingHouse.getEmail());

        List<RoomDto> roomDtos = boardingHouse.getRooms().stream()
                .map(room -> new RoomDto(room.getId(), room.getTitle(), room.getCapacity(), room.getIsavailable()))
                .collect(Collectors.toList());
        dto.setRooms(roomDtos);

        List<FacilityDto> facilityDtos = boardingHouse.getFacilities().stream()
                .map(facility -> new FacilityDto(facility.getId(), facility.getName()))
                .collect(Collectors.toList());
        dto.setFacilities(facilityDtos);

        return dto;
    }
    public BoardingHouseDto updateBoarding(Integer id, BoardingHouseDto boardingHouseDto) {
        Optional<BoardingHouse> existingBoardingHouse = boardingHouseRepo.findById(id);

        if (existingBoardingHouse.isPresent()) {
            BoardingHouse boardingHouse = existingBoardingHouse.get();

            boardingHouse.setCity(boardingHouseDto.getCity());
            boardingHouse.setType(boardingHouseDto.getType());
            boardingHouse.setPhone(boardingHouseDto.getPhone());
            boardingHouse.setLocation(boardingHouseDto.getLocation());
            boardingHouse.setDescription(boardingHouseDto.getDescription());
            boardingHouse.setEmail(boardingHouseDto.getEmail());
            boardingHouse.setPrice(boardingHouseDto.getPrice());
            boardingHouse.setStreet(boardingHouseDto.getStreet());
            boardingHouse.setImage(boardingHouseDto.getImage());

            BoardingHouse updatedBoardingHouse = boardingHouseRepo.save(boardingHouse);

            return new BoardingHouseDto(
                    updatedBoardingHouse.getId(),
                    updatedBoardingHouse.getCity(),
                    updatedBoardingHouse.getType(),
                    updatedBoardingHouse.getPhone(),
                    updatedBoardingHouse.getLocation(),
                    updatedBoardingHouse.getDescription(),
                    updatedBoardingHouse.getEmail(),
                    updatedBoardingHouse.getPrice(),
                    updatedBoardingHouse.getStreet(),
                    String.valueOf(updatedBoardingHouse.getImage())
            );
        }
        return null;
    }
    public int deleteBoarding(Integer id) {
        if (boardingHouseRepo.existsById(id)) {
            boardingHouseRepo.deleteById(id);
            return 1;
        }
        return 0;
    }
    private BoardingHouseDto convertToDto(BoardingHouse boardingHouse) {
        BoardingHouseDto dto = new BoardingHouseDto();
        dto.setId(boardingHouse.getId());
        dto.setTitle(boardingHouse.getTitle());
        dto.setType(boardingHouse.getType());
        dto.setPhone(boardingHouse.getPhone());
        dto.setLocation(boardingHouse.getLocation());
        dto.setDescription(boardingHouse.getDescription());
        dto.setCity(boardingHouse.getCity());
        dto.setStreet(boardingHouse.getStreet());
        dto.setPrice(boardingHouse.getPrice());
        dto.setEmail(boardingHouse.getEmail());
        return dto;
    }
    private final String uploadDirectory = "D:/final project/group project/group-project-cs/Back_End/testing/src/main/resources/uploads/";

    public void saveImages(Integer boardingHouseId, MultipartFile[] files) throws IOException {
        BoardingHouse boardingHouse = boardingHouseRepo.findById(boardingHouseId)
                .orElseThrow(() -> new IllegalArgumentException("BoardingHouse not found"));

        Path boardingHousePath = Paths.get(uploadDirectory + boardingHouseId);
        if (!Files.exists(boardingHousePath)) {
            Files.createDirectories(boardingHousePath);
        }

        List<Image> savedImages = new ArrayList<>();
        for (MultipartFile file : files) {
            Path filePath = boardingHousePath.resolve(file.getOriginalFilename());
            file.transferTo(filePath);

            Image image = new Image();
            image.setFilePath(filePath.toString());
            image.setBoardingHouse(boardingHouse);
            savedImages.add(image);
        }

        imageRepo.saveAll(savedImages);
    }

    public List<Path> getImages(Integer boardingHouseId) throws IOException {
        Path boardingHousePath = Paths.get(uploadDirectory + boardingHouseId);
        List<Path> imagePaths = new ArrayList<>();

        if (Files.exists(boardingHousePath) && Files.isDirectory(boardingHousePath)) {
            DirectoryStream<Path> directoryStream = Files.newDirectoryStream(boardingHousePath);
            for (Path path : directoryStream) {
                imagePaths.add(path);
            }
        }
        return imagePaths;
    }

    public FileSystemResource getImageResource(Integer boardingHouseId, String imageName) throws IOException {
        Path imagePath = Paths.get(uploadDirectory + boardingHouseId + "/" + imageName);

        if (Files.exists(imagePath)) {
            return new FileSystemResource(imagePath.toFile());
        } else {
            return null;
        }
    }
    public long countAllHouses() {
        return boardingHouseRepo.count();
    }
}
