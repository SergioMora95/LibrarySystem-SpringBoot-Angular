package com.eml.librarybackend.repository;

import com.eml.librarybackend.entity.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Integer> {
    List<Libro> findByEstadoLibro(String estadoLibro);
}
