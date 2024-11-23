package com.eml.librarybackend.domain.dto;

import com.eml.librarybackend.author.model.Autor;
import com.eml.librarybackend.domain.entity.Categoria;
import com.eml.librarybackend.domain.editorial.Editorial;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idLibro;
    private int cantidadLibro;
    private String imagenLibro;
    private String descripcionLibro;
    private String tituloLibro;
    private String estadoLibro;

    @ManyToOne
    @JoinColumn(name = "id_autor")
    private Autor autor;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_editorial")
    private Editorial editorial;

    public Libro() {
    }

    public Libro(int idLibro, int cantidadLibro, String imagenLibro, String descripcionLibro, String tituloLibro, String estadoLibro, Autor autor, Categoria categoria, Editorial editorial) {
        this.idLibro = idLibro;
        this.cantidadLibro = cantidadLibro;
        this.imagenLibro = imagenLibro;
        this.descripcionLibro = descripcionLibro;
        this.tituloLibro = tituloLibro;
        this.estadoLibro = estadoLibro;
        this.autor = autor;
        this.categoria = categoria;
        this.editorial = editorial;
    }

    public int getIdLibro() {
        return idLibro;
    }

    public void setIdLibro(int idLibro) {
        this.idLibro = idLibro;
    }

    public int getCantidadLibro() {
        return cantidadLibro;
    }

    public void setCantidadLibro(int cantidadLibro) {
        this.cantidadLibro = cantidadLibro;
    }

    public String getImagenLibro() {
        return imagenLibro;
    }

    public void setImagenLibro(String imagenLibro) {
        this.imagenLibro = imagenLibro;
    }

    public String getDescripcionLibro() {
        return descripcionLibro;
    }

    public void setDescripcionLibro(String descripcionLibro) {
        this.descripcionLibro = descripcionLibro;
    }

    public String getTituloLibro() {
        return tituloLibro;
    }

    public void setTituloLibro(String tituloLibro) {
        this.tituloLibro = tituloLibro;
    }

    public String getEstadoLibro() {
        return estadoLibro;
    }

    public void setEstadoLibro(String estadoLibro) {
        this.estadoLibro = estadoLibro;
    }

    public Autor getAutor() {
        return autor;
    }

    public void setAutor(Autor autor) {
        this.autor = autor;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Editorial getEditorial() {
        return editorial;
    }

    public void setEditorial(Editorial editorial) {
        this.editorial = editorial;
    }
}
