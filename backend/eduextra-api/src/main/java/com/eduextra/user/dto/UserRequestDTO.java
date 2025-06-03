package com.eduextra.user.dto;

import com.eduextra.user.model.Role;
import lombok.Data;

@Data
public class UserRequestDTO {
    private String fullName;
    private String email;
    private String password;
    private Role role;
}
