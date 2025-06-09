package com.eduextra.user.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.never;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import com.eduextra.exception.EmailAlreadyExistsException;
import com.eduextra.user.dto.UserRequestDTO;
import com.eduextra.user.dto.UserResponseDTO;
import com.eduextra.user.model.Role;
import com.eduextra.user.model.User;
import com.eduextra.user.repository.UserRepository;


@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@DisplayName("UserService Simple Tests")
public class UserServiceSimpleTest {
    @Mock
    private UserRepository userRepository;


    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;


    private User testUser;
    private UserRequestDTO testRequest;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .fullName("Juan Pérez")
                .email("juan@example.com")
                .password("encoded_password")
                .role(Role.STUDENT)
                .isActive(true)
                .build();
                
        testRequest = new UserRequestDTO();
        testRequest.setFullName("Juan Pérez");
        testRequest.setEmail("juan@example.com");
        testRequest.setPassword("password123");
        testRequest.setRole(Role.STUDENT);
    }
    
    @Test
    @DisplayName("Debería crear un usuario exitosamente")
    void createUser_WithValidData_ShouldReturnUserResponse() {
        // GIVEN
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encoded_password");
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        
        // WHEN
        UserResponseDTO result = userService.createUser(testRequest);
        
        // THEN
        assertNotNull(result);
        assertEquals("Juan Pérez", result.getFullName());
        assertEquals("juan@example.com", result.getEmail());
        assertEquals(Role.STUDENT, result.getRole());
        
        verify(userRepository).existsByEmail("juan@example.com");
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }
    
    @Test
    @DisplayName("Debería obtener usuario por ID exitosamente")
    void getUserById_WithValidId_ShouldReturnUser() {
        // GIVEN
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        
        // WHEN
        UserResponseDTO result = userService.getUserById(1L);
        
        // THEN
        assertNotNull(result);
        assertEquals("Juan Pérez", result.getFullName());
        assertEquals("juan@example.com", result.getEmail());
        
        verify(userRepository).findById(1L);
    }

    @Test
    @DisplayName("Debería lanzar excepción cuando el usuario no existe")
    void getUserById_WithInvalidId_ShouldThrowException() {
        // GIVEN
        when(userRepository.findById(999L)).thenReturn(Optional.empty());
        
        // WHEN & THEN
        assertThrows(Exception.class, () -> {
            userService.getUserById(999L);
        });
        
        verify(userRepository).findById(999L);
    }

    @Test
    @DisplayName("Debería lanzar excepción si el email ya existe al crear un usuario")
    void createUser_WithDuplicateEmail_ShouldThrowEmailAlreadyExistsException() {
        // GIVEN
        when(userRepository.existsByEmail("juan@example.com")).thenReturn(true);
        
        // WHEN & THEN
        EmailAlreadyExistsException exception = assertThrows(
            EmailAlreadyExistsException.class,
            () -> userService.createUser(testRequest)
        );
        
        // Verificar el mensaje de la excepción
        assertEquals("Email already exists", exception.getMessage());
        
        // Verificar que SÍ se verificó el email
        verify(userRepository).existsByEmail("juan@example.com");
        
        // Verificar que NO se intentó guardar ni hashear
        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(anyString());
    }

    

}
