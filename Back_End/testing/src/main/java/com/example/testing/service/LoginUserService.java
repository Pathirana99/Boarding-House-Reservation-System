package com.example.testing.service;

import com.example.testing.dto.LoginUserDto;
import com.example.testing.dto.MailDto;
import com.example.testing.dto.ReturnLoginUserDto;
import com.example.testing.entity.LoginUser;
import com.example.testing.repo.LoginUserRepo;
import com.example.testing.utill.SignInMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service

public class LoginUserService {
    @Autowired
    LoginUserRepo loginUserRepo;
    @Autowired
    SignInMail signInMail;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;

    public ReturnLoginUserDto saveLoginUser(LoginUserDto loginUserDto) {
        String encodedPassword = passwordEncoder.encode(loginUserDto.getPassword());

        if (loginUserRepo.existsLoginUserByEmail(loginUserDto.getEmail())) {
            return null;
        }

        LoginUser save = loginUserRepo.save(
                new LoginUser(loginUserDto.getContactNo(),encodedPassword,loginUserDto.getEmail(),loginUserDto.getRole(), loginUserDto.getPassword()));
        signInMail.sendEmail(loginUserDto);
        return new ReturnLoginUserDto(save.getEmail(), save.getId());
    }
    public LoginUserDto updateLoginUser(Integer id, LoginUserDto loginUserDto){
        if(loginUserRepo.existsById(id)){
            LoginUser existingUser = loginUserRepo.findById(id).orElse(null);
            if (existingUser != null) {
                existingUser.setContactNo(loginUserDto.getContactNo());
                existingUser.setEmail(loginUserDto.getEmail());
                existingUser.setName(loginUserDto.getName());
                existingUser.setRole(loginUserDto.getRole());

                LoginUser updatedUser = loginUserRepo.save(existingUser);
                return new LoginUserDto(updatedUser.getId(), updatedUser.getContactNo(), updatedUser.getEmail(), updatedUser.getRole(), updatedUser.getName());
            }
        }
        return null;
    }
    public List<LoginUserDto> getAllLoginUser(){
        List<LoginUser> all = loginUserRepo.findAll();

        List<LoginUserDto> loginUserDtos = new ArrayList<>();
        for(LoginUser loginUser : all){
            loginUserDtos.add(new LoginUserDto(loginUser.getId(), loginUser.getContactNo(), loginUser.getPassword(), loginUser.getEmail(), loginUser.getRole(), loginUser.getPassword()));
        }
        return loginUserDtos;
    }
    public LoginUserDto getLoginUserById(Integer id) {
        return loginUserRepo.findById(id)
                .map(loginUser -> new LoginUserDto(
                        loginUser.getId(),
                        loginUser.getContactNo(),
                        loginUser.getPassword(),
                        loginUser.getEmail(),
                        loginUser.getRole(),
                        loginUser.getName()))
                .orElse(null);
    }

    public int deleteLoginUser(Integer id){
        if (loginUserRepo.existsById(id)){
            loginUserRepo.deleteById(id);
            return 1;
        }
        return 0;
    }
    private final ConcurrentHashMap<String, String> verificationCodes = new ConcurrentHashMap<>();

    public boolean sendVerificationCode(String email) {
        if (!loginUserRepo.existsLoginUserByEmail(email)) {
            return false;
        }
        String code = String.format("%06d", new Random().nextInt(999999));
        verificationCodes.put(email, code);
        // Prepare the email
        MailDto mailDto = new MailDto();
        mailDto.setTomail(email);
        mailDto.setSubject("Password Reset Code");
        mailDto.setMessage("Your password reset code is: " + code);

        // Send the email
        sendEmail(mailDto);

        return true;
    }
    public void sendEmail(MailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject(mailDto.getSubject());
        message.setTo(mailDto.getTomail());
        message.setFrom("sunithkaushalya.pp@gmail.com");
        message.setText(mailDto.getMessage());

        mailSender.send(message);
    }

    public boolean resetPassword(String email, String code, String newPassword) {
        String storedCode = verificationCodes.get(email);
        if (storedCode != null && storedCode.equals(code)) {
            LoginUser user = loginUserRepo.findByEmail(email);
            if (user != null) {
                user.setPassword(passwordEncoder.encode(newPassword));
                loginUserRepo.save(user);
                verificationCodes.remove(email);
                return true;
            }
        }
        return false;
    }
}
