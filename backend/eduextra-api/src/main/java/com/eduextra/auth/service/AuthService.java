package com.eduextra.auth.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eduextra.auth.dto.AuthResponseDTO;
import com.eduextra.auth.dto.LoginRequestDTO;
import com.eduextra.auth.dto.RefreshTokenRequestDTO;
import com.eduextra.auth.dto.RegisterRequestDTO;
import com.eduextra.exception.EmailAlreadyExistsException;
import com.eduextra.exception.UserNotFoundException;
import com.eduextra.security.JwtService;
import com.eduextra.user.model.Role;
import com.eduextra.user.model.User;
import com.eduextra.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        // Verificar si el email ya existe
        if(userRepository.existsByEmail(registerRequestDTO.getEmail())) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        // Crear nuevo usuario
        User user = User.builder()
                .fullName(registerRequestDTO.getFullName())
                .email(registerRequestDTO.getEmail())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword())) // Encriptar password
                .role(registerRequestDTO.getRole() != null ? registerRequestDTO.getRole() : Role.STUDENT) // Rol por defecto
                .isActive(true)
                .build();
        
        User savedUser = userRepository.save(user);
        
        // Generar JWT token y refresh token
        String jwtToken = jwtService.generateToken(savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);

        return AuthResponseDTO.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
    }
    
    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
        // Autenticar usuario
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequestDTO.getEmail(),
                loginRequestDTO.getPassword()
            )
        );
        
        // Buscar usuario
        User user = userRepository.findByEmail(loginRequestDTO.getEmail())
            .orElseThrow(() -> new UserNotFoundException("Invalid credentials"));
        
        // Verificar que el usuario esté activo
        if (!user.getIsActive()) {
            throw new UserNotFoundException("User account is deactivated");
        }
        
        // Generar JWT token y refresh token
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
    
    public AuthResponseDTO refreshToken(RefreshTokenRequestDTO refreshTokenRequestDTO) {
        final String refreshToken = refreshTokenRequestDTO.getRefreshToken();
        final String userEmail = jwtService.extractUsername(refreshToken);
        
        if (userEmail != null) {
            User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
            
            if (!jwtService.isTokenExpired(refreshToken) && user.getIsActive()) {
                String accessToken = jwtService.generateToken(user);
                String newRefreshToken = jwtService.generateRefreshToken(user);
                
                return AuthResponseDTO.builder()
                        .token(accessToken)
                        .refreshToken(newRefreshToken)
                        .fullName(user.getFullName())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .build();
            }
        }
        
        throw new UserNotFoundException("Invalid refresh token");
    }
}
