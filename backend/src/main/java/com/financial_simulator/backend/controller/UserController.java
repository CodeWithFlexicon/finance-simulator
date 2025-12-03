package com.financial_simulator.backend.controller;

import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.service.UserService;
import com.financial_simulator.backend.dto.RegisterRequest;
import com.financial_simulator.backend.dto.UserResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable Long id) {
        return userService.getById(id);
    }
}
