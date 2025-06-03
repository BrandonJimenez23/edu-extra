package com.eduextra.user.dto;

import com.eduextra.user.model.Role;
import lombok.Data;

@Data
public class UserResponseDTO {
    private Long id;
    private String fullName;
    private String email;
    private Role role;
}
