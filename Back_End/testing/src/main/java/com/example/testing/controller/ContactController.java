package com.example.testing.controller;

import com.example.testing.dto.ContactDto;
import com.example.testing.entity.Contact;
import com.example.testing.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    ContactService service;

    @PostMapping("/saveMessage")
    public ResponseEntity saveMessage(@RequestBody ContactDto contactDto) {
        service.saveMessage(contactDto);
        return new ResponseEntity<>("save sucess", HttpStatus.OK);
    }
    @GetMapping("/getMessage")
    public Optional<Contact> getMessage(@RequestParam Integer id){
        return service.getMessage(id);
    }
    @PostMapping("/feedback")
    public ResponseEntity<String> feedback(@RequestBody ContactDto contactDto) {
        service.sendFeedbackEmail(contactDto);
        return new ResponseEntity<>("Feedback email sent successfully.", HttpStatus.OK);
    }
}
