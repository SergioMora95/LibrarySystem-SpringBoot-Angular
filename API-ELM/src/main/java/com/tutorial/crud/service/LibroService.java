package com.tutorial.crud.service;

import com.tutorial.crud.entity.Libro;
import com.tutorial.crud.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    public List<Libro> list() {
        return libroRepository.findAll();
    }

    public Optional<Libro> getOne(int id) {
        return libroRepository.findById(id);
    }

    public List<Libro> findByEstado(String estado) {
        return libroRepository.findByEstadoLibro(estado);
    }

    public void save(Libro libro) {
        libroRepository.save(libro);
    }

    public void delete(int id) {
        libroRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return libroRepository.existsById(id);
    }
}
