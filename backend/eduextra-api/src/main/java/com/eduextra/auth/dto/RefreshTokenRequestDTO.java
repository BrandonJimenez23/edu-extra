package com.eduextra.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * DTO for refresh token request
 * Contains the refresh token to be used for generating a new access token
 */
@Data
@Schema(description = "Request DTO for refreshing access token")
public class RefreshTokenRequestDTO {
    
    @NotBlank(message = "Refresh token is required")
    @Schema(description = "Refresh token used to generate new access token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String refreshToken;
}
