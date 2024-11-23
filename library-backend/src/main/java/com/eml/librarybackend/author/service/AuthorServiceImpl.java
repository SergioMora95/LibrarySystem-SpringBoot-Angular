package com.eml.librarybackend.author.service;


import com.eml.librarybackend.author.model.Author;
import com.eml.librarybackend.author.repository.AuthorRepository;
import com.eml.librarybackend.author.utils.AuthorConstants;
import com.eml.librarybackend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;

    public List<Author> list() {
        return authorRepository.findAll();
    }

    public Author getById(long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(AuthorConstants.AUTHOR_NOT_FOUND));
    }

    public void save(Author author) {
        authorRepository.save(author);
    }

    @Override
    public Author update(long id, Author author) {
        Author authorToUpdate = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(AuthorConstants.AUTHOR_NOT_FOUND));

        authorToUpdate.setName(author.getName());

        return authorRepository.save(authorToUpdate);
    }

    public void delete(long id) {
        var author = authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(AuthorConstants.AUTHOR_NOT_FOUND));
        authorRepository.delete(author);
    }


}
