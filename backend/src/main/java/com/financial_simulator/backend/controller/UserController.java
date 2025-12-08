package com.financial_simulator.backend.controller;

import com.financial_simulator.backend.dto.LoginRequest;
import com.financial_simulator.backend.dto.LoginResponse;
import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.service.JwtService;
import com.financial_simulator.backend.service.UserService;
import com.financial_simulator.backend.dto.RegisterRequest;
import com.financial_simulator.backend.dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        User saved = userService.register(request);

        UserResponse response = new UserResponse(
                saved.getId(),
                saved.getEmail(),
                saved.getFirstName(),
                saved.getLastName(),
                saved.getCreatedAt()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.login(request);

        String token = jwtService.generateToken(user.getEmail());

        LoginResponse response = new LoginResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                token
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable Long id) {
        return userService.getById(id);
    }
}
