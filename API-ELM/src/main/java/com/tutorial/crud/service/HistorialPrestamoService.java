package com.tutorial.crud.service;

import com.tutorial.crud.entity.HistorialPrestamo;
import com.tutorial.crud.repository.HistorialPrestamoRepository;
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
