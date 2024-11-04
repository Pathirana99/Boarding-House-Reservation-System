package com.example.testing.controller;

import com.example.testing.dto.LoginUserDto;
import com.example.testing.dto.MailDto;
import com.example.testing.dto.ReturnLoginUserDto;
import com.example.testing.service.LoginUserService;
import com.example.testing.utill.JWTAuthenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/loginuser")
public class LoginUserController {
    @Autowired
    LoginUserService service;

    @Autowired
    JWTAuthenticator jwtAuthenticator;

    @PostMapping("/saveLoginUser")
    public ResponseEntity<Object> saveLoginUser(@RequestBody LoginUserDto loginUserDto){
                ReturnLoginUserDto returnLoginUserDto = service.saveLoginUser(loginUserDto);
                if (returnLoginUserDto != null) {
                    return new ResponseEntity<>("Register Success", HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Already regitered with this Email", HttpStatus.CREATED);
                }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateLoginUser(@PathVariable Integer id, @RequestBody LoginUserDto loginUserDto){
        LoginUserDto updatedUser = service.updateLoginUser(id, loginUserDto);
        if(updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
    @PutMapping("/{id}/updatePassword")
    public ResponseEntity<Object> updatePassword(@PathVariable Integer id, @RequestBody Map<String, String> request) {
        String newPassword = request.get("newPassword");
        if (newPassword == null || newPassword.isEmpty()) {
            return new ResponseEntity<>("New password is required", HttpStatus.BAD_REQUEST);
        }

        boolean isUpdated = service.updatePassword(id, newPassword);
        if (isUpdated) {
            return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
    @GetMapping("/AllLoginuser")
    public ResponseEntity<List<LoginUserDto>> getAllLoginUser() {
        List<LoginUserDto> allLoginUser = service.getAllLoginUser();
        return new ResponseEntity<>(allLoginUser, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getLoginUserById(@PathVariable Integer id) {
        LoginUserDto loginUserDto = service.getLoginUserById(id);
        if (loginUserDto != null) {
            return new ResponseEntity<>(loginUserDto, HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLoginUser(@PathVariable Integer id){
        int i = service.deleteLoginUser(id);
        if (i == 1){
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
    }
    @PostMapping("/forgotPassword")
    public ResponseEntity<String> sendVerificationCode(@RequestBody MailDto mailDto) {
        boolean isSent = service.sendVerificationCode(mailDto.getTomail());
        if (isSent) {
            return new ResponseEntity<>("Verification code sent to email.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Email not registered.", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean isReset = service.resetPassword(request.getEmail(), request.getCode(), request.getNewPassword());
        if (isReset) {
            return new ResponseEntity<>("Password reset successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid code or email.", HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/getAllLoginUsersWithoutAdmin")
    public ResponseEntity<List<LoginUserDto>> getAllLoginUsersWithoutAdmin() {
        List<LoginUserDto> allLoginUsers = service.getAllLoginUsersWithoutAdmin();
        return new ResponseEntity<>(allLoginUsers, HttpStatus.OK);
    }

    // DTO for Reset Password Request
    public static class ResetPasswordRequest {
        private String email;
        private String code;
        private String newPassword;

        // Getters and Setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getNewPassword() {
            return newPassword;
        }

        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }
    @GetMapping("/count")
    public long countAllLoginUsers() {
        return service.countAllLoginUsers();
    }
    @GetMapping("/owners")
    public ResponseEntity<List<LoginUserDto>> getAllOwners() {
        List<LoginUserDto> owners = service.getAllOwners();
        return new ResponseEntity<>(owners, HttpStatus.OK);
    }

}
