package com.eml.librarybackend.domain.repository;

import com.eml.librarybackend.domain.entity.RepositorioExterno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioExternoRepository extends JpaRepository<RepositorioExterno, Integer> {
}
