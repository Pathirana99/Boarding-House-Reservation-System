package com.example.testing.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginUserDto {
    private Integer id;
    private Integer contactNo;
    private String password;
    private String email;
    public String role;
    private String name;

    public LoginUserDto(Integer id, Integer contactNo, String password, String email, String role) {
    }

    // Alternative constructor for specific use cases
    public LoginUserDto(Integer id, String name, String password, String email, String role) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
    }
}
