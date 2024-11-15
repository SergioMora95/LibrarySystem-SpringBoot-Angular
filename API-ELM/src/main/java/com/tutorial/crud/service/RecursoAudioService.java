package com.tutorial.crud.service;

import com.tutorial.crud.entity.RecursoAudio;
import com.tutorial.crud.repository.RecursoAudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RecursoAudioService {

    @Autowired
    private RecursoAudioRepository recursoAudioRepository;

    public List<RecursoAudio> list() {
        return recursoAudioRepository.findAll();
    }

    public Optional<RecursoAudio> getOne(int id) {
        return recursoAudioRepository.findById(id);
    }

    public void save(RecursoAudio recursoAudio) {
        recursoAudioRepository.save(recursoAudio);
    }

    public void delete(int id) {
        recursoAudioRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return recursoAudioRepository.existsById(id);
    }
}
