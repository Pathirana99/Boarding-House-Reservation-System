package com.example.testing.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "index";  // The public landing page
    }

    @GetMapping("/login")
    public String login() {
        return "login";  // Custom login page
    }

    @GetMapping("/home")
    public String home() {
        return "home";  // Redirected after successful login
    }
}