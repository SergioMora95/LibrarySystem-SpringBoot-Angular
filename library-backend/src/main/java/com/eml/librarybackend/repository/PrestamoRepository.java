package com.eml.librarybackend.repository;

import com.eml.librarybackend.entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrestamoRepository extends JpaRepository<Prestamo, Integer> {
    List<Prestamo> findByEstadoPrestamo(String estadoPrestamo);
    List<Prestamo> findByUsuarioId(int usuarioId);
    boolean existsByUsuarioIdAndVecesRenovadoGreaterThan(int usuarioId, int vecesRenovado);
}
