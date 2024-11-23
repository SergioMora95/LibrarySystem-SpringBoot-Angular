package com.eml.librarybackend.domain.repository;

import com.eml.librarybackend.domain.editorial.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EditorialRepository extends JpaRepository<Editorial, Integer> {
}
