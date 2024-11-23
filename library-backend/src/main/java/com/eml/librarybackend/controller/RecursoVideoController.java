package com.eml.librarybackend.controller;

import com.eml.librarybackend.domain.dto.Mensaje;
import com.eml.librarybackend.domain.entity.RecursoVideo;
import com.eml.librarybackend.domain.service.RecursoVideoService;
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
@RequestMapping("/recursoVideo")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class RecursoVideoController {

    @Autowired
    RecursoVideoService recursoVideoService;

    @GetMapping("/lista")
    public ResponseEntity<List<RecursoVideo>> list() {
        List<RecursoVideo> list = recursoVideoService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        if (!recursoVideoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        RecursoVideo recursoVideo = recursoVideoService.getOne(id).orElse(null);
        return new ResponseEntity<>(recursoVideo, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RecursoVideo recursoVideo) {
        recursoVideoService.save(recursoVideo);
        return new ResponseEntity<>(new Mensaje("recurso video creado"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody RecursoVideo recursoVideoUpdated) {
        if (!recursoVideoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);

        RecursoVideo recursoVideo = recursoVideoService.getOne(id).orElse(null);
        if (recursoVideo != null) {
            recursoVideo.setFechaCarga(recursoVideoUpdated.getFechaCarga());
            recursoVideo.setUrlVideo(recursoVideoUpdated.getUrlVideo());
            recursoVideo.setDescripcionVideo(recursoVideoUpdated.getDescripcionVideo());
            recursoVideo.setCategoria(recursoVideoUpdated.getCategoria());
            // Actualizar otros campos según sea necesario
            recursoVideoService.save(recursoVideo);
            return new ResponseEntity<>(new Mensaje("recurso video actualizado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("el recurso video no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!recursoVideoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        recursoVideoService.delete(id);
        return new ResponseEntity<>(new Mensaje("recurso video eliminado"), HttpStatus.OK);
    }
}
