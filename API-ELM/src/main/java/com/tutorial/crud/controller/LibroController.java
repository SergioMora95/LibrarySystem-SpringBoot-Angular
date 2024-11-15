package com.tutorial.crud.controller;

import com.tutorial.crud.dto.Mensaje;
import com.tutorial.crud.entity.Autor;
import com.tutorial.crud.entity.Categoria;
import com.tutorial.crud.entity.Editorial;
import com.tutorial.crud.entity.Libro;
import com.tutorial.crud.repository.AutorRepository;
import com.tutorial.crud.repository.CategoriaRepository;
import com.tutorial.crud.repository.EditorialRepository;
import com.tutorial.crud.service.LibroService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/libro")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class LibroController {

    @Autowired
    LibroService libroService;
    @Autowired
    private EditorialRepository editorialRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private AutorRepository autorRepository;

    @GetMapping("/lista")
    public ResponseEntity<?> list() {
        return new ResponseEntity<>(libroService.list(), HttpStatus.OK);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<?> listDisponibles() {
        return new ResponseEntity<>(libroService.findByEstado("Disponible"), HttpStatus.OK);
    }

    @GetMapping("/agotados")
    public ResponseEntity<?> listAgotados() {
        return new ResponseEntity<>(libroService.findByEstado("Agotado"), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id) {
        return libroService.existsById(id) ?
                new ResponseEntity<>(libroService.getOne(id).orElse(null), HttpStatus.OK) :
                new ResponseEntity<>(new Mensaje("No existe"), HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Libro libro) {
        if (StringUtils.isBlank(libro.getTituloLibro()))
            return new ResponseEntity<>(new Mensaje("El título es obligatorio"), HttpStatus.BAD_REQUEST);
        if (libro.getCantidadLibro() < 0)
            return new ResponseEntity<>(new Mensaje("La cantidad debe ser mayor o igual que 0"), HttpStatus.BAD_REQUEST);

        // Lógica para guardar el libro...

        libroService.save(libro);
        return new ResponseEntity<>(new Mensaje("Libro creado"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Libro libroUpdated) {
        if (!libroService.existsById(id))
            return new ResponseEntity<>(new Mensaje("No existe"), HttpStatus.NOT_FOUND);
        if (StringUtils.isBlank(libroUpdated.getTituloLibro()))
            return new ResponseEntity<>(new Mensaje("El título es obligatorio"), HttpStatus.BAD_REQUEST);
        if (libroUpdated.getCantidadLibro() < 0)
            return new ResponseEntity<>(new Mensaje("La cantidad debe ser mayor o igual que 0"), HttpStatus.BAD_REQUEST);

        Libro libro = libroService.getOne(id).orElse(null);
        if (libro != null) {
            libro.setTituloLibro(libroUpdated.getTituloLibro());
            libro.setCantidadLibro(libroUpdated.getCantidadLibro());
            libro.setEstadoLibro(libroUpdated.getEstadoLibro());
            libro.setDescripcionLibro(libroUpdated.getDescripcionLibro());
            libro.setImagenLibro(libroUpdated.getImagenLibro());

            Autor autor = autorRepository.findById(libroUpdated.getAutor().getIdAutor()).orElse(null);
            libro.setAutor(autor);

            Categoria categoria = categoriaRepository.findById(libroUpdated.getCategoria().getIdCategoria()).orElse(null);
            libro.setCategoria(categoria);

            Editorial editorial = editorialRepository.findById(libroUpdated.getEditorial().getIdEditorial()).orElse(null);
            libro.setEditorial(editorial);

            libroService.save(libro);
            return new ResponseEntity<>(new Mensaje("Libro actualizado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("El libro no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id) {
        if (!libroService.existsById(id))
            return new ResponseEntity<>(new Mensaje("No existe"), HttpStatus.NOT_FOUND);
        libroService.delete(id);
        return new ResponseEntity<>(new Mensaje("Libro eliminado"), HttpStatus.OK);
    }
}
