package com.tutorial.crud.repository;

import com.tutorial.crud.entity.RecursoVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoVideoRepository extends JpaRepository<RecursoVideo, Integer> {
}
