package com.eml.librarybackend.repository;

import com.eml.librarybackend.entity.RepositorioExterno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioExternoRepository extends JpaRepository<RepositorioExterno, Integer> {
}
