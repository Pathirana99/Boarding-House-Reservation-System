package com.example.testing.service;

import com.example.testing.dto.LoginUserDto;
import com.example.testing.dto.ReturnLoginUserDto;
import com.example.testing.entity.LoginUser;
import com.example.testing.repo.LoginUserRepo;
import com.example.testing.utill.SignInMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class LoginUserService {
    @Autowired
    LoginUserRepo loginUserRepo;
    @Autowired
    SignInMail signInMail;
    @Autowired
    PasswordEncoder passwordEncoder;

    public ReturnLoginUserDto saveLoginUser(LoginUserDto loginUserDto) {
        String encodedPassword = passwordEncoder.encode(loginUserDto.getPassword());

        if (loginUserRepo.existsLoginUserByEmail(loginUserDto.getEmail())) {
            return null;
        }

        LoginUser save = loginUserRepo.save(
                new LoginUser(loginUserDto.getContactNo(),encodedPassword,loginUserDto.getEmail(),loginUserDto.getRole()));
        signInMail.sendEmail(loginUserDto);
        return new ReturnLoginUserDto(save.getEmail(), save.getId());
    }
    public LoginUserDto updateLoginUser(Integer id, LoginUserDto loginUserDto){
        if(loginUserRepo.existsById(id)){
            LoginUser update = loginUserRepo.save(new LoginUser(id, loginUserDto.getContactNo(), loginUserDto.getPassword(), loginUserDto.getEmail()));
            return new LoginUserDto(update.getId(), update.getContactNo(), update.getPassword(), update.getEmail(), update.getRole());
        }
        return null;
    }
    public List<LoginUserDto> getAllLoginUser(){
        List<LoginUser> all = loginUserRepo.findAll();

        List<LoginUserDto> loginUserDtos = new ArrayList<>();
        for(LoginUser loginUser : all){
            loginUserDtos.add(new LoginUserDto(loginUser.getId(), loginUser.getContactNo(), loginUser.getPassword(), loginUser.getEmail(), loginUser.getRole()));
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
                        loginUser.getRole()))
                .orElse(null);
    }

    public int deleteLoginUser(Integer id){
        if (loginUserRepo.existsById(id)){
            loginUserRepo.deleteById(id);
            return 1;
        }
        return 0;
    }
}
