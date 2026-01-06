package com.financial_simulator.backend.service;

import com.financial_simulator.backend.dto.CategoryRequest;
import com.financial_simulator.backend.dto.CategoryResponse;
import com.financial_simulator.backend.model.*;
import com.financial_simulator.backend.repository.CategoryRepository;
import com.financial_simulator.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepo;
    private final UserRepository userRepo;

    public CategoryService(CategoryRepository categoryRepo, UserRepository userRepo) {
        this.categoryRepo = categoryRepo;
        this.userRepo = userRepo;
    }

    public Category create(Long userId, CategoryRequest request) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String name = request.getName().trim();
        if (categoryRepo.existsByUserAndNameIgnoreCase(user, name)) {
            throw new RuntimeException("Category name already exists");
        }

        return categoryRepo.save(new Category(user, name, request.getCategoryType()));
    }

    public List<Category> list(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return categoryRepo.findByUser(user);
    }

    public CategoryResponse response(Category category) {
        return new CategoryResponse(category.getId(), category.getName(), category.getCategoryType(), category.getCreatedAt());
    }
}
