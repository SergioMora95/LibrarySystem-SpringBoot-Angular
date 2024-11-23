package com.eml.librarybackend.author.service;

import com.eml.librarybackend.author.model.Author;
import com.eml.librarybackend.author.repository.AuthorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Author Service Implementation Test")
class AuthorServiceImplTest {

    @InjectMocks
    private AuthorServiceImpl authorService;

    @Mock
    private AuthorRepository authorRepository;

    private Author author;

    @BeforeEach
    void setUp() {
        author = Author.builder()
                .id(1)
                .name("Author 1")
                .build();
    }

    @Test
    void list() {
        // given
        List<Author> authors = List.of(author);

        // when
        when(authorRepository.findAll()).thenReturn(authors);

        List<Author> result = authorService.list();

        // then
        verify(authorRepository).findAll();
        assertNotNull(result);
        assertEquals(authors, result);
    }

    @Test
    void getById() {

        // when
        when(authorRepository.findById(anyLong())).thenReturn(Optional.of(author));

        Author result = authorService.getById(anyLong());

        // then
        verify(authorRepository).findById(anyLong());
        assertNotNull(result);
        assertEquals(author, result);
    }

    @Test
    void save() {

        // when
        when(authorRepository.save(author)).thenReturn(author);

        authorService.save(author);

        // then
        verify(authorRepository).save(author);

    }

    @Test
    void update() {

        // given
        var authorUpdated = Author.builder()
                .id(1)
                .name("Author 1 Updated")
                .build();

        // when
        when(authorRepository.findById(anyLong())).thenReturn(Optional.of(author));
        when(authorRepository.save(author)).thenReturn(authorUpdated);

        Author result = authorService.update(anyLong(), author);

        // then
        verify(authorRepository).findById(anyLong());
        verify(authorRepository).save(author);
        assertNotNull(result);
        assertNotEquals(author.getName(), result.getName(), "Name should be updated");

    }

    @Test
    void delete() {

        // when
        when(authorRepository.findById(anyLong())).thenReturn(Optional.of(author));

        authorService.delete(anyLong());

        // then
        verify(authorRepository).findById(anyLong());
        verify(authorRepository).delete(author);
    }


}