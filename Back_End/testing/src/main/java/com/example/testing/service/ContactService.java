package com.example.testing.service;

import com.example.testing.dto.ContactDto;
import com.example.testing.entity.Contact;
import com.example.testing.repo.ContactRepo;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class ContactService {
    @Autowired
    ContactRepo contactRepo;
    @Autowired
    JavaMailSender mailSender;

    public ContactDto saveMessage(ContactDto contactDto) {
        Contact save = contactRepo.save(new Contact(contactDto.getMessage()));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("B.Door");
        message.setTo("sunithkaushalya.pp@gmail.com");
        message.setFrom("sunithkaushalya.pp@gmail.com");
        message.setText(contactDto.getMessage());

        mailSender.send(message);
        return new ContactDto(save.getId(),save.getMessage());
    }

    public Optional<Contact> getMessage(Integer id){
            return  contactRepo.getContactById(id);
    }

    public void sendFeedbackEmail(ContactDto contactDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("RATING Bdoor...");
        message.setTo("sunithkaushalya.pp@gmail.com");
        message.setFrom("sunithkaushalya.pp@gmail.com");
        message.setText(contactDto.getMessage());

        mailSender.send(message);
    }

}
