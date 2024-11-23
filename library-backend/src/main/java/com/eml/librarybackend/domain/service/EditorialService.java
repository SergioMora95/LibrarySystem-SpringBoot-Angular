package com.eml.librarybackend.domain.service;

import com.eml.librarybackend.domain.editorial.Editorial;
import com.eml.librarybackend.domain.repository.EditorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EditorialService {

    @Autowired
    private EditorialRepository editorialRepository;

    public List<Editorial> list() {
        return editorialRepository.findAll();
    }

    public Optional<Editorial> getOne(int id) {
        return editorialRepository.findById(id);
    }

    public void save(Editorial editorial) {
        editorialRepository.save(editorial);
    }

    public void delete(int id) {
        editorialRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return editorialRepository.existsById(id);
    }
}
