package com.eml.librarybackend.controller;

import com.eml.librarybackend.dto.Mensaje;
import com.eml.librarybackend.entity.Categoria;
import com.eml.librarybackend.service.CategoriaService;
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
@RequestMapping("/categoria")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;

    @GetMapping("/lista")
    public ResponseEntity<List<Categoria>> list() {
        List<Categoria> list = categoriaService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        if (!categoriaService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        Categoria categoria = categoriaService.getOne(id).orElse(null);
        return new ResponseEntity<>(categoria, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Categoria categoria) {
        if (StringUtils.isBlank(categoria.getNombreCategoria()))
            return new ResponseEntity<>(new Mensaje("el nombre es obligatorio"), HttpStatus.BAD_REQUEST);
        categoriaService.save(categoria);
        return new ResponseEntity<>(new Mensaje("categoria creada"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Categoria categoriaUpdated) {
        if (!categoriaService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        if (StringUtils.isBlank(categoriaUpdated.getNombreCategoria()))
            return new ResponseEntity<>(new Mensaje("el nombre es obligatorio"), HttpStatus.BAD_REQUEST);

        Categoria categoria = categoriaService.getOne(id).orElse(null);
        if (categoria != null) {
            categoria.setNombreCategoria(categoriaUpdated.getNombreCategoria());
            // Actualizar otros campos según sea necesario
            categoriaService.save(categoria);
            return new ResponseEntity<>(new Mensaje("categoria actualizada"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("la categoria no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!categoriaService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        categoriaService.delete(id);
        return new ResponseEntity<>(new Mensaje("categoria eliminada"), HttpStatus.OK);
    }
}
