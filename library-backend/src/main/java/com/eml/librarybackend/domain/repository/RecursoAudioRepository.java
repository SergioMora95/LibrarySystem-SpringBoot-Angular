package com.eml.librarybackend.domain.repository;

import com.eml.librarybackend.domain.resource.RecursoAudio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecursoAudioRepository extends JpaRepository<RecursoAudio, Integer> {
}
