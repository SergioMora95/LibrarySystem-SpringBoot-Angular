package com.tutorial.crud.repository;

import com.tutorial.crud.entity.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Integer> {
    List<Libro> findByEstadoLibro(String estadoLibro);
}
