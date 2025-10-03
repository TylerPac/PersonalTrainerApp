package dev.tylerpac.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.tylerpac.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}