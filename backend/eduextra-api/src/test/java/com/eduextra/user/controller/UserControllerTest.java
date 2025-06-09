package com.eduextra.user.controller;

import com.eduextra.user.dto.UserRequestDTO;
import com.eduextra.user.dto.UserResponseDTO;
import com.eduextra.user.model.Role;
import com.eduextra.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    private ObjectMapper objectMapper;
    private UserRequestDTO userRequest;
    private UserResponseDTO userResponse;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();

        userRequest = new UserRequestDTO();
        userRequest.setFullName("John Doe");
        userRequest.setEmail("john@example.com");
        userRequest.setPassword("securePass123");
        userRequest.setRole(Role.STUDENT);

        userResponse = new UserResponseDTO();
        userResponse.setId(1L);
        userResponse.setFullName("John Doe");
        userResponse.setEmail("john@example.com");
        userResponse.setRole(Role.STUDENT);
    }

    @Test
    void testCreateUser_ReturnsUserResponseDTO() throws Exception {
        when(userService.createUser(any(UserRequestDTO.class))).thenReturn(userResponse);

        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.fullName").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }
}
