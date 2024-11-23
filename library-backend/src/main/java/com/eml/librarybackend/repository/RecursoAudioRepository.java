package com.eml.librarybackend.repository;

import com.eml.librarybackend.entity.RecursoAudio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoAudioRepository extends JpaRepository<RecursoAudio, Integer> {
}
