package com.tutorial.crud.repository;

import com.tutorial.crud.entity.RecursoDigital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoDigitalRepository extends JpaRepository<RecursoDigital, Integer> {
}
