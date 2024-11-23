package com.eml.librarybackend.domain.service;

import com.eml.librarybackend.domain.entity.HistorialPrestamo;
import com.eml.librarybackend.domain.repository.HistorialPrestamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistorialPrestamoService {

    @Autowired
    private HistorialPrestamoRepository historialPrestamoRepository;

    public List<HistorialPrestamo> findAll() {
        return historialPrestamoRepository.findAll();
    }

    public HistorialPrestamo save(HistorialPrestamo historialPrestamo) {
        return historialPrestamoRepository.save(historialPrestamo);
    }

}
