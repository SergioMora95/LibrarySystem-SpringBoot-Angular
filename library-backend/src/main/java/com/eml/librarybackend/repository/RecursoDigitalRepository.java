package com.eml.librarybackend.repository;

import com.eml.librarybackend.entity.RecursoDigital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoDigitalRepository extends JpaRepository<RecursoDigital, Integer> {
}
