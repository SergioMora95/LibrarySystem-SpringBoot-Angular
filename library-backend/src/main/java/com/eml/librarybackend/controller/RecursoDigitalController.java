package com.eml.librarybackend.controller;

import com.eml.librarybackend.dto.Mensaje;
import com.eml.librarybackend.entity.RecursoDigital;
import com.eml.librarybackend.service.RecursoDigitalService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/recursoDigital")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class RecursoDigitalController {

    @Autowired
    RecursoDigitalService recursoDigitalService;

    @GetMapping("/lista")
    public ResponseEntity<List<RecursoDigital>> list() {
        List<RecursoDigital> list = recursoDigitalService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        if (!recursoDigitalService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        RecursoDigital recursoDigital = recursoDigitalService.getOne(id).orElse(null);
        return new ResponseEntity<>(recursoDigital, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RecursoDigital recursoDigital) {
        if (StringUtils.isBlank(recursoDigital.getNombreRecurso()))
            return new ResponseEntity<>(new Mensaje("el nombre del recurso es obligatorio"), HttpStatus.BAD_REQUEST);
        recursoDigitalService.save(recursoDigital);
        return new ResponseEntity<>(new Mensaje("recurso digital creado"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody RecursoDigital recursoDigitalUpdated) {
        if (!recursoDigitalService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        if (StringUtils.isBlank(recursoDigitalUpdated.getNombreRecurso()))
            return new ResponseEntity<>(new Mensaje("el nombre del recurso es obligatorio"), HttpStatus.BAD_REQUEST);

        RecursoDigital recursoDigital = recursoDigitalService.getOne(id).orElse(null);
        if (recursoDigital != null) {
            recursoDigital.setNombreRecurso(recursoDigitalUpdated.getNombreRecurso());
            recursoDigital.setArchivoRecurso(recursoDigitalUpdated.getArchivoRecurso());
            recursoDigital.setImagenRecurso(recursoDigitalUpdated.getImagenRecurso());
            recursoDigital.setEstadoRecursoDigital(recursoDigitalUpdated.getEstadoRecursoDigital());
            recursoDigital.setAutor(recursoDigitalUpdated.getAutor());
            recursoDigital.setCategoria(recursoDigitalUpdated.getCategoria());

            recursoDigitalService.save(recursoDigital);
            return new ResponseEntity<>(new Mensaje("recurso digital actualizado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("el recurso digital no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!recursoDigitalService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        recursoDigitalService.delete(id);
        return new ResponseEntity<>(new Mensaje("recurso digital eliminado"), HttpStatus.OK);
    }
}

