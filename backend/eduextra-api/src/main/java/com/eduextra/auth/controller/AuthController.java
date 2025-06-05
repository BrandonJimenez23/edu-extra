package com.eduextra.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eduextra.auth.dto.AuthResponseDTO;
import com.eduextra.auth.dto.LoginRequestDTO;
import com.eduextra.auth.dto.RefreshTokenRequestDTO;
import com.eduextra.auth.dto.RegisterRequestDTO;
import com.eduextra.auth.service.AuthService;
import com.eduextra.exception.ErrorResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * REST controller for managing authentication and user registration.
 * Implements JWT-based authentication with standardized responses and proper HTTP status codes.
 * 
 * Note: This API returns JWT tokens for successful authentication and registration.
 * All error responses follow a consistent ErrorResponse format.
 */

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Operations related to user authentication and registration")
public class AuthController {
    
    private final AuthService authService;
    
    @Operation(
        summary = "Register a new user",
        description = "Creates a new user account in the system with the provided details. Requires a valid email, password, name, and role. Returns JWT tokens upon successful registration.",
        tags = {"Authentication"},
        responses = {
            @ApiResponse(responseCode = "200", description = "User registered successfully", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Validation error or invalid request data", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Email already exists in the system", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }
    
    @Operation(
        summary = "Authenticate user",
        description = "Authenticates a user with email and password credentials. Returns JWT tokens upon successful authentication that can be used for subsequent API requests.",
        tags = {"Authentication"},
        responses = {
            @ApiResponse(responseCode = "200", description = "User authenticated successfully", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Validation error or invalid request data", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Invalid credentials provided", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "403", description = "User account is disabled", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }
    
    @Operation(
        summary = "Refresh access token",
        description = "Uses a valid refresh token to generate a new access token and refresh token pair. This allows users to maintain their session without re-entering credentials.",
        tags = {"Authentication"},
        responses = {
            @ApiResponse(responseCode = "200", description = "Tokens refreshed successfully", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Validation error or invalid request data", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Invalid or expired refresh token", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponseDTO> refreshToken(@Valid @RequestBody RefreshTokenRequestDTO request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }
}
