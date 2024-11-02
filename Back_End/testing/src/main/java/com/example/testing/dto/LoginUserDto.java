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

    
}
