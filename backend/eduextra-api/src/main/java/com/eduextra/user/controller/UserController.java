package com.eduextra.user.controller;

import com.eduextra.user.dto.UserRequestDTO;
import com.eduextra.user.dto.UserResponseDTO;
import com.eduextra.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
        summary = "Enable a user",
        description = "Enables a user identified by their ID.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "204", description = "User enabled successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
        }
    )
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
            @ApiResponse(responseCode = "404", description = "User not found")
        }
    )
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
            @ApiResponse(responseCode = "400", description = "Validation error")
        }
    )
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO) {
        return ResponseEntity.ok(userService.createUser(userRequestDTO));
    }

    @Operation(
        summary = "Get user by ID",
        description = "Fetches a user by their unique ID. Returns the user's details if found.",
        tags = {"User Management"}
    )
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @Operation(
        summary = "Get all users",
        description = "Retrieves a list of all registered users in the system.",
        tags = {"User Management"}
    )
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Operation(
        summary = "Update user details",
        description = "Updates the details of an existing user identified by their ID. Requires valid user data.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "200", description = "User updated successfully"),
            @ApiResponse(responseCode = "404", description = "User not found"),
            @ApiResponse(responseCode = "400", description = "Validation error")
        }
    )
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id,
            @Valid @RequestBody UserRequestDTO userRequestDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userRequestDTO));
    }

    @Operation(
        summary = "Delete user",
        description = "Deletes (or deactivates) a user identified by their ID. This action is irreversible.",
        tags = {"User Management"},
        responses = {
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
        }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.permanentlyDeleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Permanently delete a user",
        description = "Deletes a user permanently from the system identified by their ID. This action is irreversible.",
        tags = {"User Management"}
    )
    @DeleteMapping("/{id}/permanent")
    public ResponseEntity<Void> permanentlyDeleteUser(@PathVariable Long id) {
        userService.permanentlyDeleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
