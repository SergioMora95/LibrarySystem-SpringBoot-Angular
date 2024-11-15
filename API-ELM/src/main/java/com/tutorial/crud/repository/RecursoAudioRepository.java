package com.tutorial.crud.repository;

import com.tutorial.crud.entity.RecursoAudio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoAudioRepository extends JpaRepository<RecursoAudio, Integer> {
}
