package com.eduextra.user.repository;
import com.eduextra.user.model.Role;
import com.eduextra.user.model.User;
import java.util.List;
import java.util.Optional;
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

    // Buscar usuarios activos
    List<User> findByIsActiveTrue();
}

