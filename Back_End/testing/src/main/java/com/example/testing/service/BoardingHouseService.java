package com.example.testing.service;

import com.example.testing.dto.BoardingHouseDto;
import com.example.testing.dto.BoardingOwnerDto;
import com.example.testing.dto.FacilityDto;
import com.example.testing.dto.RoomDto;
import com.example.testing.entity.BoardingHouse;
import com.example.testing.entity.BoardingOwner;
import com.example.testing.entity.Image;
import com.example.testing.entity.Room;
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

    public BoardingHouseService(BoardingHouseRepo boardingHouseRepo, BoardingOwnerRepo boardingOwnerRepo) {
        this.boardingHouseRepo = boardingHouseRepo;
        this.boardingOwnerRepo = boardingOwnerRepo;
    }

    public BoardingOwner saveOwnerWithHousesAndRooms(BoardingOwnerDto ownerDto, List<BoardingHouseDto> boardingHouseDtos, Integer userId) {
        BoardingOwner boardingOwner = new BoardingOwner();
        boardingOwner.setName(ownerDto.getName());
        boardingOwner.setEmail(ownerDto.getEmail());
        boardingOwner.setPassword(ownerDto.getPassword()); // Handle password encryption if necessary

        // Save the BoardingOwner first to get the ID
        BoardingOwner savedOwner = boardingOwnerRepo.save(boardingOwner);

        // Loop through the BoardingHouseDtos to save each BoardingHouse
        for (BoardingHouseDto houseDto : boardingHouseDtos) {
            BoardingHouse boardingHouse = new BoardingHouse();
            boardingHouse.setTitle(houseDto.getTitle());
            boardingHouse.setType(houseDto.getType());
            boardingHouse.setPhone(houseDto.getPhone());
            boardingHouse.setLocation(houseDto.getLocation());
            boardingHouse.setDescription(houseDto.getDescription());
            boardingHouse.setCity(houseDto.getCity());
            boardingHouse.setStreet(houseDto.getStreet());
            boardingHouse.setPrice(houseDto.getPrice());
            boardingHouse.setEmail(houseDto.getEmail());
            boardingHouse.setBoardingOwner(savedOwner); // Set the owner
            boardingHouse.setDistance(houseDto.getDistance());
            boardingHouse.setLatitude(houseDto.getLatitude());
            boardingHouse.setLongitude(houseDto.getLongitude());
            boardingHouse.setUniversity(houseDto.getUniversity());
            boardingHouse.setRentDuration(houseDto.getRentDuration());
            boardingHouse.setAdvancePayment(houseDto.getAdvancePayment());
            boardingHouse.setAdvancePaymentDuration(houseDto.getAdvancePaymentDuration());
            boardingHouse.setBillsIncluded(houseDto.getBillsIncluded());

            // Save the BoardingHouse and link it to the owner
            BoardingHouse savedHouse = boardingHouseRepo.save(boardingHouse);

            // Save Rooms for the BoardingHouse
            for (BoardingHouseDto.RoomInfo roomDto : houseDto.getRooms()) {
                Room room = new Room();
                room.setTitle(roomDto.getTitle());
                room.setCapacity(String.valueOf(roomDto.getCapacity()));
                room.setIsAvailable(roomDto.getIsAvailable());
                room.setBoardingHouse(savedHouse); // Set the link to the boarding house

                // Save each room
                // Save room to your room repository here (not shown)
            }
        }

        return savedOwner; // Return the saved owner with associated boarding houses
    }

    public List<BoardingHouseDto> getBoardingHousesByCity(String city) {
        List<BoardingHouse> boardingHouses = boardingHouseRepo.findByCity(city);
        return boardingHouses.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<BoardingHouseDto> getAllBoardingHouses() {
        List<BoardingHouse> boardingHouses = boardingHouseRepo.findAll();
        return boardingHouses.stream().map(this::convertToDto).collect(Collectors.toList());
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

            // Update and save the boarding house
            boardingHouseRepo.save(boardingHouse);
            return convertToDto(boardingHouse);
        }
        return null; // Handle not found case as needed
    }

    public void deleteBoardingHouse(Integer id) {
        boardingHouseRepo.deleteById(id);
    }

    private BoardingHouseDto convertToDto(BoardingHouse boardingHouse) {
        BoardingHouseDto dto = new BoardingHouseDto();
        dto.setId(boardingHouse.getId());
        dto.setTitle(boardingHouse.getTitle());
        dto.setType(boardingHouse.getType());
        dto.setLocation(boardingHouse.getLocation());
        dto.setDescription(boardingHouse.getDescription());
        dto.setCity(boardingHouse.getCity());
        dto.setStreet(boardingHouse.getStreet());
        dto.setPrice(boardingHouse.getPrice());
        dto.setEmail(boardingHouse.getEmail());
        dto.setDistance(boardingHouse.getDistance());
        dto.setLatitude(boardingHouse.getLatitude());
        dto.setLongitude(boardingHouse.getLongitude());
        dto.setUniversity(boardingHouse.getUniversity());
        dto.setRentDuration(boardingHouse.getRentDuration());
        dto.setAdvancePayment(boardingHouse.getAdvancePayment());
        dto.setAdvancePaymentDuration(boardingHouse.getAdvancePaymentDuration());
        dto.setBillsIncluded(boardingHouse.getBillsIncluded());

        return dto;
    }
    private final String uploadDirectory = "D:/final project/group project/group-project-cs/Back_End/testing/src/main/resources/uploads/";

    // Method to save uploaded images
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

            // Save each image path and associate it with the BoardingHouse
            Image image = new Image();
            image.setFilePath(filePath.toString());
            image.setBoardingHouse(boardingHouse);
            savedImages.add(image);
        }

        imageRepo.saveAll(savedImages);
    }

    // Method to get all image paths for a boarding house
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

    // Method to get an image resource by name
    public FileSystemResource getImageResource(Integer boardingHouseId, String imageName) throws IOException {
        Path imagePath = Paths.get(uploadDirectory + boardingHouseId + "/" + imageName);

        // Check if the image file exists and return as resource
        if (Files.exists(imagePath)) {
            return new FileSystemResource(imagePath.toFile());
        } else {
            return null; // Return null if file doesn't exist
        }
    }
    public long countAllHouses() {
        return boardingHouseRepo.count();
    }
}
