package com.eml.librarybackend.domain.repository;

import com.eml.librarybackend.domain.entity.HistorialPrestamo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistorialPrestamoRepository extends JpaRepository<HistorialPrestamo, Integer> {
}
