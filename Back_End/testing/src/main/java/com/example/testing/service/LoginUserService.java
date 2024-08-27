package com.example.testing.service;

import com.example.testing.dto.LoginUserDto;
import com.example.testing.entity.LoginUser;
import com.example.testing.repo.LoginUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class LoginUserService {
    @Autowired
    LoginUserRepo loginUserRepo;
    public LoginUserDto saveLoginUser(LoginUserDto loginUserDto){

            LoginUser save = loginUserRepo.save(new LoginUser(loginUserDto.getContactNo(), loginUserDto.getPassword(), loginUserDto.getEmail()));
            return new LoginUserDto(save.getId(), save.getContactNo(), save.getPassword(), save.getEmail());
    }
    public LoginUserDto updateLoginUser(Integer id, LoginUserDto loginUserDto){
        if(loginUserRepo.existsById(id)){
            LoginUser update = loginUserRepo.save(new LoginUser(id, loginUserDto.getContactNo(), loginUserDto.getPassword(), loginUserDto.getEmail()));
            return new LoginUserDto(update.getId(), update.getContactNo(), update.getPassword(), update.getEmail());
        }
        return null;
    }
    public List<LoginUserDto> getAllLoginUser(){
        List<LoginUser> all = loginUserRepo.findAll();

        List<LoginUserDto> loginUserDtos = new ArrayList<>();
        for(LoginUser loginUser : all){
            loginUserDtos.add(new LoginUserDto(loginUser.getId(), loginUser.getContactNo(), loginUser.getPassword(), loginUser.getEmail()));
        }
        return loginUserDtos;
    }
    public int deleteLoginUser(Integer id){
        if (loginUserRepo.existsById(id)){
            loginUserRepo.deleteById(id);
            return 1;
        }
        return 0;
    }
}
