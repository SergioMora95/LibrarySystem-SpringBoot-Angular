package com.eml.librarybackend.author.controller;

import com.eml.librarybackend.author.model.Author;
import com.eml.librarybackend.author.service.AuthorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(
        name = "CRUD REST APIs para autores",
        description = "API para realizar operaciones CREATE, UPDATE, FETCH y DELETE de autores"
)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/authors")
public class AuthorController {

    
    private final AuthorService authorService;
    private static final Logger logger = LoggerFactory.getLogger(AuthorController.class);

    @GetMapping
    public ResponseEntity<List<Author>> list() {
        logger.info("Fetching all authors");
        var authors = authorService.list();
        return ResponseEntity.ok(authors);
    }

    @GetMapping("{id}")
    public ResponseEntity<Author> getById(@PathVariable int id) {
        logger.info("Searching author by id: {}", id);
        var author = authorService.getById(id);
        return ResponseEntity.ok(author);
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Author author) {
        logger.info("Creating author: {}", author);
        authorService.save(author);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Author creado correctamente");
    }

    @PutMapping("{id}")
    public ResponseEntity<Author> update(@PathVariable long id, @RequestBody @Valid Author author) {
        logger.info("Updating author by id and body: {}, {}", id, author);
        var authorUpdated = authorService.update(id, author);
        return ResponseEntity.ok(authorUpdated);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        logger.info("Deleting author by id: {}", id);
        authorService.delete(id);
        return ResponseEntity.ok("Author eliminado correctamente");
    }
}