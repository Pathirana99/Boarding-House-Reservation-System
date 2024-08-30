package com.example.testing.controller;

import com.example.testing.dto.LoginUserDto;
import com.example.testing.dto.ReturnLoginUserDto;
import com.example.testing.service.LoginUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loginuser")
public class LoginUserController {
    @Autowired
    LoginUserService service;

    @PostMapping("/saveLoginUser")
    public ResponseEntity<Object> saveLoginUser(@RequestBody LoginUserDto loginUserDto){
        ReturnLoginUserDto ReturnLoginUserDto = service.saveLoginUser(loginUserDto);
        if(ReturnLoginUserDto != null){
            return new ResponseEntity<>(ReturnLoginUserDto, HttpStatus.OK);
        }
        return new ResponseEntity<>("Already regitered with this Email", HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateLoginUser(@PathVariable Integer id, @RequestBody LoginUserDto loginuser){
       LoginUserDto update = service.updateLoginUser(id, loginuser);
        if(update != null) {
            return new ResponseEntity<>(loginuser, HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }
    @GetMapping
    public ResponseEntity<List<LoginUserDto>> getAllLoginUser(){
        List<LoginUserDto> allLoginUser = service.getAllLoginUser();
        return new ResponseEntity<>(allLoginUser, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLoginUser(@PathVariable Integer id){
        int i = service.deleteLoginUser(id);
        if (i == 1){
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }
}
