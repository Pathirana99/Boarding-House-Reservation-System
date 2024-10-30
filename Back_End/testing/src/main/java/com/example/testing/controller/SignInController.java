package com.example.testing.controller;

import com.example.testing.dto.AuthenticationRequest;
import com.example.testing.dto.AuthenticationResponse;
import com.example.testing.entity.LoginUser;
import com.example.testing.service.SignInService;
import com.example.testing.utill.JwtUtill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/SignInUser")
public class SignInController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtill jwtUtil;

    @Autowired
    SignInService signInService;

    @PostMapping("/SignIn")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            final UserDetails userDetails = signInService.loadUserByUsername(request.getEmail());
            LoginUser user = signInService.findByEmail(request.getEmail());

            final String jwt = jwtUtil.generateToken(userDetails, user.getEmail(), user.getRole());

            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authentication failed: Bad credentials");
        }
    }
}
