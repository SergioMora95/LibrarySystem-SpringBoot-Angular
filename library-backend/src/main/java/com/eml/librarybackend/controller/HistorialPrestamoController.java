package com.eml.librarybackend.controller;

import com.eml.librarybackend.domain.dto.Mensaje;
import com.eml.librarybackend.domain.entity.HistorialPrestamo;
import com.eml.librarybackend.domain.service.HistorialPrestamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/historialPrestamo")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class HistorialPrestamoController {

    @Autowired
    private HistorialPrestamoService historialPrestamoService;

    @GetMapping("/lista")
    public ResponseEntity<List<HistorialPrestamo>> list() {
        List<HistorialPrestamo> list = historialPrestamoService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody HistorialPrestamo historialPrestamo) {
        historialPrestamoService.save(historialPrestamo);
        return new ResponseEntity<>(new Mensaje("Historial de préstamo registrado"), HttpStatus.CREATED);
    }

}
