package com.eml.librarybackend.author.service;

import com.eml.librarybackend.author.model.Author;

import java.util.List;

public interface AuthorService {

     List<Author> list();

     Author getById(long id);

     void save(Author author);

     Author update(long id, Author author);

     void delete(long id);

}
