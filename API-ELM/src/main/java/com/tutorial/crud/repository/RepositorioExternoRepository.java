package com.tutorial.crud.repository;

import com.tutorial.crud.entity.RepositorioExterno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorioExternoRepository extends JpaRepository<RepositorioExterno, Integer> {
}
