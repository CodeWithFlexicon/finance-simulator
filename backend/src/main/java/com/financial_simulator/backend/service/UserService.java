package com.financial_simulator.backend.service;

import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User createUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        return userRepo.save(user);
    }

    public Optional<User> getById(Long id) {
        return userRepo.findById(id);
    }
}
