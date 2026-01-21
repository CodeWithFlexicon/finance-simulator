package com.financial_simulator.backend.controller;

import com.financial_simulator.backend.dto.CategoryRequest;
import com.financial_simulator.backend.dto.CategoryResponse;
import com.financial_simulator.backend.model.Category;
import com.financial_simulator.backend.model.User;
import com.financial_simulator.backend.service.CategoryService;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@AuthenticationPrincipal User user, @Valid @RequestBody CategoryRequest request) {
        Category category = categoryService.create(user.getId(), request);
        return ResponseEntity.status(201).body(categoryService.response(category));
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> list(@AuthenticationPrincipal User user) {
        List<CategoryResponse> categories = categoryService.list(user.getId())
                .stream()
                .map(categoryService::response)
                .toList();

        return ResponseEntity.ok(categories);
    }
}
