package com.tutorial.crud.controller;

import com.tutorial.crud.dto.Mensaje;
import com.tutorial.crud.entity.RepositorioExterno;
import com.tutorial.crud.service.RepositorioExternoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/repositorioExterno")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class RepositorioExternoController {

    @Autowired
    RepositorioExternoService repositorioExternoService;

    @GetMapping("/lista")
    public ResponseEntity<List<RepositorioExterno>> list() {
        List<RepositorioExterno> list = repositorioExternoService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        if (!repositorioExternoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        RepositorioExterno repositorioExterno = repositorioExternoService.getOne(id).orElse(null);
        return new ResponseEntity<>(repositorioExterno, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RepositorioExterno repositorioExterno) {
        if (StringUtils.isBlank(repositorioExterno.getUrlRepositorio()))
            return new ResponseEntity<>(new Mensaje("la URL del repositorio es obligatoria"), HttpStatus.BAD_REQUEST);
        // Puedes agregar más validaciones según tus requerimientos
        repositorioExterno.setFechaCarga(new Date());
        repositorioExternoService.save(repositorioExterno);
        return new ResponseEntity<>(new Mensaje("repositorio externo creado"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody RepositorioExterno repositorioExternoUpdated) {
        if (!repositorioExternoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);

        RepositorioExterno repositorioExterno = repositorioExternoService.getOne(id).orElse(null);
        if (repositorioExterno != null) {
            repositorioExterno.setUrlRepositorio(repositorioExternoUpdated.getUrlRepositorio());
            repositorioExterno.setDescripcionRepositorio(repositorioExternoUpdated.getDescripcionRepositorio());
            // Actualizar otros campos según sea necesario
            repositorioExternoService.save(repositorioExterno);
            return new ResponseEntity<>(new Mensaje("repositorio externo actualizado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("el repositorio externo no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!repositorioExternoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        repositorioExternoService.delete(id);
        return new ResponseEntity<>(new Mensaje("repositorio externo eliminado"), HttpStatus.OK);
    }
}
