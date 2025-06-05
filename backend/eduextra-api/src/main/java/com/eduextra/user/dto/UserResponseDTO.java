package com.eduextra.user.dto;

import com.eduextra.user.model.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for user response data
 * Contains user information without sensitive data like passwords
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "User response DTO containing user information")
public class UserResponseDTO {
    
    @Schema(description = "User's unique identifier", example = "1")
    private Long id;
    
    @Schema(description = "User's full name", example = "Juan Pérez")
    private String fullName;
    
    @Schema(description = "User's email address", example = "juan@eduextra.com")
    private String email;
    
    @Schema(description = "User's role in the system")
    private Role role;
    
    @Schema(description = "Whether the user account is active", example = "true")
    private Boolean isActive;
    
    @Schema(description = "User's avatar URL", example = "https://unavatar.io/juan")
    private String avatarUrl;
    
    @Schema(description = "When the user was created")
    private LocalDateTime createdAt;
    
    @Schema(description = "When the user was last updated")
    private LocalDateTime updatedAt;
}
