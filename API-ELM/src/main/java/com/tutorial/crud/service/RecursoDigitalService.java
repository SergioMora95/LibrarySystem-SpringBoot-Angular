package com.tutorial.crud.service;

import com.tutorial.crud.entity.RecursoDigital;
import com.tutorial.crud.repository.RecursoDigitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RecursoDigitalService {

    @Autowired
    private RecursoDigitalRepository recursoDigitalRepository;

    public List<RecursoDigital> list() {
        return recursoDigitalRepository.findAll();
    }

    public Optional<RecursoDigital> getOne(int id) {
        return recursoDigitalRepository.findById(id);
    }

    public void save(RecursoDigital recursoDigital) {
        recursoDigitalRepository.save(recursoDigital);
    }

    public void delete(int id) {
        recursoDigitalRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return recursoDigitalRepository.existsById(id);
    }
}
