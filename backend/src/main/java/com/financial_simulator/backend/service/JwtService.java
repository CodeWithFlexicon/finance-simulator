package com.financial_simulator.backend.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

@Service
public class JwtService {
    private final String secretKey;

    public JwtService(@Value("${JWT_SECRET}") String secretKey) {
        this.secretKey = secretKey;
    }

    // Use SHA256 security for tokens
    public String generateToken(String email) {
        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Change to an hour
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String extractEmail(String token) {
        return JWT.require(Algorithm.HMAC256(secretKey))
                .build()
                .verify(token)
                .getSubject();
    }
}
