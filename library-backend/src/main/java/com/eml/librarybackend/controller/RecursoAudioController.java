package com.eml.librarybackend.controller;

import com.eml.librarybackend.dto.Mensaje;
import com.eml.librarybackend.entity.RecursoAudio;
import com.eml.librarybackend.service.RecursoAudioService;
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
@RequestMapping("/recursoAudio")
@CrossOrigin(origins = "http://localhost:4200")
public class RecursoAudioController {

    @Autowired
    RecursoAudioService recursoAudioService;

    @GetMapping("/lista")
    public ResponseEntity<List<RecursoAudio>> list() {
        List<RecursoAudio> list = recursoAudioService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        if (!recursoAudioService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        RecursoAudio recursoAudio = recursoAudioService.getOne(id).orElse(null);
        return new ResponseEntity<>(recursoAudio, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RecursoAudio recursoAudio) {
        if (StringUtils.isBlank(recursoAudio.getUrlAudio()))
            return new ResponseEntity<>(new Mensaje("la URL del audio es obligatoria"), HttpStatus.BAD_REQUEST);
        recursoAudioService.save(recursoAudio);
        return new ResponseEntity<>(new Mensaje("recurso de audio creado"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody RecursoAudio recursoAudioUpdated) {
        if (!recursoAudioService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        if (StringUtils.isBlank(recursoAudioUpdated.getUrlAudio()))
            return new ResponseEntity<>(new Mensaje("la URL del audio es obligatoria"), HttpStatus.BAD_REQUEST);

        RecursoAudio recursoAudio = recursoAudioService.getOne(id).orElse(null);
        if (recursoAudio != null) {
            recursoAudio.setFechaCarga(recursoAudioUpdated.getFechaCarga());
            recursoAudio.setUrlAudio(recursoAudioUpdated.getUrlAudio());
            recursoAudio.setDescripcionAudio(recursoAudioUpdated.getDescripcionAudio());
            recursoAudio.setCategoria(recursoAudioUpdated.getCategoria());
            // Actualizar otros campos según sea necesario
            recursoAudioService.save(recursoAudio);
            return new ResponseEntity<>(new Mensaje("recurso de audio actualizado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("el recurso de audio no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!recursoAudioService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        recursoAudioService.delete(id);
        return new ResponseEntity<>(new Mensaje("recurso de audio eliminado"), HttpStatus.OK);
    }
}
