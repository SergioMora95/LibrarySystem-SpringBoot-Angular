package com.eml.librarybackend.config.security.repository;

import com.eml.librarybackend.config.security.entity.Rol;
import com.eml.librarybackend.config.security.enums.RolNombre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByRolNombre(RolNombre rolNombre);
}
