package com.financial_simulator.backend.service;

import com.financial_simulator.backend.dto.LoginRequest;
import com.financial_simulator.backend.dto.LoginResponse;
import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.repository.UserRepository;
import com.financial_simulator.backend.dto.RegisterRequest;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User register(RegisterRequest request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getEmail(),
                request.getFirstName(),
                request.getLastName(),
                hashedPassword
        );

        return userRepo.save(user);
    }

    public User login(LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Incorrect email"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    public Optional<User> getById(Long id) {
        return userRepo.findById(id);
    }
}
