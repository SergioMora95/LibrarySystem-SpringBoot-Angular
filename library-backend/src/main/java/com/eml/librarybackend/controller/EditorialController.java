package com.eml.librarybackend.controller;

import com.eml.librarybackend.domain.dto.Mensaje;
import com.eml.librarybackend.domain.editorial.Editorial;
import com.eml.librarybackend.domain.service.EditorialService;
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
@RequestMapping("/editorial")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class EditorialController {

    @Autowired
    EditorialService editorialService;

    @GetMapping("/lista")
    public ResponseEntity<List<Editorial>> list() {
        List<Editorial> list = editorialService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        if (!editorialService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        Editorial editorial = editorialService.getOne(id).orElse(null);
        return new ResponseEntity<>(editorial, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Editorial editorial) {
        if (StringUtils.isBlank(editorial.getNombreEditorial()))
            return new ResponseEntity<>(new Mensaje("el nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        editorialService.save(editorial);
        return new ResponseEntity<>(new Mensaje("editorial creada"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Editorial editorialUpdated) {
        if (!editorialService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        if (StringUtils.isBlank(editorialUpdated.getNombreEditorial()))
            return new ResponseEntity<>(new Mensaje("el nombre es obligatorio"), HttpStatus.BAD_REQUEST);

        Editorial editorial = editorialService.getOne(id).orElse(null);
        if (editorial != null) {
            editorial.setNombreEditorial(editorialUpdated.getNombreEditorial());
            // Actualizar otros campos según sea necesario
            editorialService.save(editorial);
            return new ResponseEntity<>(new Mensaje("editorial actualizada"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("la editorial no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!editorialService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        editorialService.delete(id);
        return new ResponseEntity<>(new Mensaje("editorial eliminada"), HttpStatus.OK);
    }
}

