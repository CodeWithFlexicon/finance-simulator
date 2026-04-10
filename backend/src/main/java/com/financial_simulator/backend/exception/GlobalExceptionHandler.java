package com.financial_simulator.backend.exception;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Map<String, Object>> handleUnauthorized(
        UnauthorizedException ex,
        HttpServletRequest request
    ) {
        return ResponseEntity.status(401).body(Map.of(
            "timestamp", LocalDateTime.now().toString(),
            "status", 401,
            "error", "Unauthorized",
            "message", ex.getMessage(),
            "path", request.getRequestURI()
        ));
    }

}
