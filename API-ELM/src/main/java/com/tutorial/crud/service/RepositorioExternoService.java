package com.tutorial.crud.service;

import com.tutorial.crud.entity.RepositorioExterno;
import com.tutorial.crud.repository.RepositorioExternoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RepositorioExternoService {

    @Autowired
    private RepositorioExternoRepository repositorioExternoRepository;

    public List<RepositorioExterno> list() {
        return repositorioExternoRepository.findAll();
    }

    public Optional<RepositorioExterno> getOne(int id) {
        return repositorioExternoRepository.findById(id);
    }

    public void save(RepositorioExterno repositorioExterno) {
        repositorioExternoRepository.save(repositorioExterno);
    }

    public void delete(int id) {
        repositorioExternoRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return repositorioExternoRepository.existsById(id);
    }
}
