package com.eml.librarybackend.domain.resource;

import com.eml.librarybackend.author.model.Autor;
import com.eml.librarybackend.domain.entity.Categoria;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class RecursoDigital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRecursoDigital;
    private String nombreRecurso;
    private String archivoRecurso;
    private String imagenRecurso;
    private String estadoRecursoDigital;

    @ManyToOne
    @JoinColumn(name = "id_autor")
    private Autor autor;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    public RecursoDigital() {
    }

    public RecursoDigital(int idRecursoDigital, String nombreRecurso, String archivoRecurso, String imagenRecurso, String estadoRecursoDigital, Autor autor, Categoria categoria) {
        this.idRecursoDigital = idRecursoDigital;
        this.nombreRecurso = nombreRecurso;
        this.archivoRecurso = archivoRecurso;
        this.imagenRecurso = imagenRecurso;
        this.estadoRecursoDigital = estadoRecursoDigital;
        this.autor = autor;
        this.categoria = categoria;
    }

    public int getIdRecursoDigital() {
        return idRecursoDigital;
    }

    public void setIdRecursoDigital(int idRecursoDigital) {
        this.idRecursoDigital = idRecursoDigital;
    }

    public String getNombreRecurso() {
        return nombreRecurso;
    }

    public void setNombreRecurso(String nombreRecurso) {
        this.nombreRecurso = nombreRecurso;
    }

    public String getArchivoRecurso() {
        return archivoRecurso;
    }

    public void setArchivoRecurso(String archivoRecurso) {
        this.archivoRecurso = archivoRecurso;
    }

    public String getImagenRecurso() {
        return imagenRecurso;
    }

    public void setImagenRecurso(String imagenRecurso) {
        this.imagenRecurso = imagenRecurso;
    }

    public String getEstadoRecursoDigital() {
        return estadoRecursoDigital;
    }

    public void setEstadoRecursoDigital(String estadoRecursoDigital) {
        this.estadoRecursoDigital = estadoRecursoDigital;
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
}
