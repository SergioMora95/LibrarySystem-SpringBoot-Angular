package com.eml.librarybackend.controller;

import com.eml.librarybackend.dto.Mensaje;
import com.eml.librarybackend.entity.Autor;
import com.eml.librarybackend.service.AutorService;
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
@RequestMapping("/autor")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class AutorController {

    @Autowired
    AutorService autorService;

    @GetMapping("/lista")
    public ResponseEntity<List<Autor>> list() {
        List<Autor> list = autorService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        if (!autorService.existsById(id))
            return new ResponseEntity<>(new Mensaje("El autor no existe"), HttpStatus.NOT_FOUND);
        Autor autor = autorService.getOne(id).orElse(null);
        return new ResponseEntity<>(autor, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Autor autor) {
        if (StringUtils.isBlank(autor.getNombreAutor()))
            return new ResponseEntity<>(new Mensaje("El nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        autorService.save(autor);
        return new ResponseEntity<>(new Mensaje("Autor creado"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Autor autorUpdated) {
        if (!autorService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        if (StringUtils.isBlank(autorUpdated.getNombreAutor()))
            return new ResponseEntity<>(new Mensaje("el nombre es obligatorio"), HttpStatus.BAD_REQUEST);

        Autor autor = autorService.getOne(id).orElse(null);
        if (autor != null) {
            autor.setNombreAutor(autorUpdated.getNombreAutor());
            // Actualizar otros campos según sea necesario
            autorService.save(autor);
            return new ResponseEntity<>(new Mensaje("Autor actualizado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("El autor no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!autorService.existsById(id))
            return new ResponseEntity<>(new Mensaje("Autor  no existe"), HttpStatus.NOT_FOUND);
        autorService.delete(id);
        return new ResponseEntity<>(new Mensaje("Autor eliminado"), HttpStatus.OK);
    }
}