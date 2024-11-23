package com.eml.librarybackend.domain.service;

import com.eml.librarybackend.domain.entity.Categoria;
import com.eml.librarybackend.domain.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> list() {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> getOne(int id) {
        return categoriaRepository.findById(id);
    }

    public void save(Categoria categoria) {
        categoriaRepository.save(categoria);
    }

    public void delete(int id) {
        categoriaRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return categoriaRepository.existsById(id);
    }
}
