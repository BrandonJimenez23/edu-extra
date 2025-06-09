package com.eduextra.user.repository;
import com.eduextra.user.model.Role;
import com.eduextra.user.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Buscar por email
    Optional<User> findByEmail(String email);

    // Ver si existe un usuario por email
    boolean existsByEmail(String email);

    // Buscar todos por rol
    List<User> findByRole(Role role);
    
    // Buscar por rol con paginación
    Page<User> findByRole(Role role, Pageable pageable);

    // Buscar usuarios activos
    List<User> findByIsActiveTrue();
    
    // Buscar por nombre con paginación
    Page<User> findByFullNameContainingIgnoreCase(String name, Pageable pageable);
    
    // Buscar por nombre y rol con paginación
    Page<User> findByFullNameContainingIgnoreCaseAndRole(String name, Role role, Pageable pageable);
}

