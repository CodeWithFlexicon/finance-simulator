package com.financial_simulator.backend.repository;

import com.financial_simulator.backend.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUser(User user);
    boolean existsByUserAndNameIgnoreCase(User user, String name);
    Optional<Category> findByIdAndUser_Id(Long id, Long userId);
}
