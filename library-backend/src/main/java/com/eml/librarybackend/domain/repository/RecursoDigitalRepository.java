package com.eml.librarybackend.domain.repository;

import com.eml.librarybackend.domain.resource.RecursoDigital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoDigitalRepository extends JpaRepository<RecursoDigital, Integer> {
}
