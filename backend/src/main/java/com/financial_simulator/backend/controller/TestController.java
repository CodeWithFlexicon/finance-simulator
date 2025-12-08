package com.financial_simulator.backend.controller;

import com.financial_simulator.backend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/whoami")
    public ResponseEntity<WhoResponse> whoami(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        WhoResponse response = new WhoResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );

        return ResponseEntity.ok(response);
    }

    public record WhoResponse(
            Long id,
            String email,
            String firstName,
            String lastName
    ) {}
}
