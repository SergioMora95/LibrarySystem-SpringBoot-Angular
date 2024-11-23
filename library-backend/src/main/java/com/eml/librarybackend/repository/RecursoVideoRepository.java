package com.eml.librarybackend.repository;

import com.eml.librarybackend.entity.RecursoVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoVideoRepository extends JpaRepository<RecursoVideo, Integer> {
}
