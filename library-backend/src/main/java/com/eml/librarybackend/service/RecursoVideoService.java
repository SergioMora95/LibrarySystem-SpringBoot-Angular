package com.eml.librarybackend.service;

import com.eml.librarybackend.entity.RecursoVideo;
import com.eml.librarybackend.repository.RecursoVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RecursoVideoService {

    @Autowired
    private RecursoVideoRepository recursoVideoRepository;

    public List<RecursoVideo> list() {
        return recursoVideoRepository.findAll();
    }

    public Optional<RecursoVideo> getOne(int id) {
        return recursoVideoRepository.findById(id);
    }

    public void save(RecursoVideo recursoVideo) {
        recursoVideoRepository.save(recursoVideo);
    }

    public void delete(int id) {
        recursoVideoRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return recursoVideoRepository.existsById(id);
    }
}
