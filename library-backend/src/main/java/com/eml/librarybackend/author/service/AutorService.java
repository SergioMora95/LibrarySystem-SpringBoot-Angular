package com.eml.librarybackend.author.service;


import com.eml.librarybackend.author.model.Autor;
import com.eml.librarybackend.author.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public List<Autor> list() {
        return autorRepository.findAll();
    }

    public Optional<Autor> getOne(int id) {
        return autorRepository.findById(id);
    }

    public void save(Autor autor) {
        autorRepository.save(autor);
    }

    public void delete(int id) {
        autorRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return autorRepository.existsById(id);
    }
}
