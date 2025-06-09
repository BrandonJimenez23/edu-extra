package com.eduextra.auth.dto;

import com.eduextra.user.model.Role;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for authentication response
 * Contains JWT token, refresh token, and user information
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Authentication response containing tokens and user info")
public class AuthResponseDTO {
    
    @Schema(description = "JWT access token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;
    
    @Schema(description = "JWT refresh token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String refreshToken;
    
    @Schema(description = "User's full name", example = "Juan Pérez")
    private String fullName;
    
    @Schema(description = "User's email address", example = "juan@eduextra.com")
    private String email;
    
    @Schema(description = "User's role in the system")
    private Role role;
}
