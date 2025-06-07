package com.eduextra.user.controller;

import com.eduextra.common.dto.PagedResponseDTO;
import com.eduextra.user.dto.UserRequestDTO;
import com.eduextra.user.dto.UserResponseDTO;
import com.eduextra.user.model.Role;
import com.eduextra.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.eduextra.exception.ErrorResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST controller for managing users.
 * Implements RESTful principles with standardized responses and proper HTTP status codes.
 * 
 * Note: This API uses direct response pattern instead of response envelope pattern
 * for simplicity and clarity. All error responses follow a consistent ErrorResponse format.
 * 
 * Security: All endpoints require JWT Bearer authentication.
 */

@RestController
@RequestMapping("/users")
@Tag(name = "User Management", description = "Operations related to user management")
@SecurityRequirement(name = "Bearer Authentication")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(
        summary = "Enable a user",
        description = "Enables a user identified by their ID.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "204", description = "User enabled successfully"),
            @ApiResponse(responseCode = "404", description = "User not found", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/enable")
    public ResponseEntity<Void> enableUser(@PathVariable Long id) {
        userService.enableUser(id, true);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Disable a user",
        description = "Disables a user identified by their ID.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "204", description = "User disabled successfully"),
            @ApiResponse(responseCode = "404", description = "User not found", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> disableUser(@PathVariable Long id) {
        userService.enableUser(id, false);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Create a new user",
        description = "Registers a new user in the system with the provided details. Requires a valid email, password, and role.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "200", description = "User created successfully"),
            @ApiResponse(responseCode = "400", description = "Validation error", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Email already exists", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        // @Valid ya se encarga de validar el DTO y lanzar MethodArgumentNotValidException si hay errores
        return ResponseEntity.ok(userService.createUser(userRequestDTO));
    }

    @Operation(
        summary = "Get user by ID",
        description = "Fetches a user by their unique ID. Returns the user's details if found.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "200", description = "User found successfully"),
            @ApiResponse(responseCode = "404", description = "User not found", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @Operation(
        summary = "Get all users",
        description = "Retrieves a list of all registered users in the system.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully")
        }
    )
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Operation(
        summary = "Get users with pagination and filters",
        description = "Retrieves a paginated list of users with optional filtering by name and role, and sorting options.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = PagedResponseDTO.class)))
        }
    )
    @GetMapping("/paginated")
    public ResponseEntity<PagedResponseDTO<UserResponseDTO>> getAllUsersPaginated(
            @Parameter(description = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Number of users per page", example = "20")
            @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Field to sort by", example = "fullName")
            @RequestParam(defaultValue = "fullName") String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(defaultValue = "asc") String sortDir,
            @Parameter(description = "Search term for user names", example = "Juan")
            @RequestParam(required = false) String search,
            @Parameter(description = "Filter by user role")
            @RequestParam(required = false) Role role) {
        return ResponseEntity.ok(userService.getAllUsers(page, size, sortBy, sortDir, search, role));
    }

    @Operation(
        summary = "Update user details",
        description = "Updates the details of an existing user identified by their ID. Requires valid user data.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "404", description = "User not found", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "400", description = "Validation error", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Email already exists", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id,
            @Valid @RequestBody UserRequestDTO userRequestDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userRequestDTO));
    }

    @Operation(
        summary = "Permanently delete a user",
        description = "Deletes a user permanently from the system identified by their ID. This action is irreversible.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "204", description = "User permanently deleted"),
            @ApiResponse(responseCode = "404", description = "User not found", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<Void> permanentlyDeleteUser(@PathVariable Long id) {
        userService.permanentlyDeleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Get current user profile",
        description = "Retrieves the profile information of the currently authenticated user based on the JWT token.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "200", description = "User profile retrieved successfully", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "User not authenticated", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "User not found", 
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
        }
    )
    @GetMapping("/profile")
    public ResponseEntity<UserResponseDTO> getCurrentUserProfile() {
        // Get current authentication from SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName(); // This is the email from JWT token
        
        // Get user profile by email
        UserResponseDTO userProfile = userService.getUserByEmail(userEmail);
        return ResponseEntity.ok(userProfile);
    }
}
