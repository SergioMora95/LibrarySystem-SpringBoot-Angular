package com.eml.librarybackend.domain.resource;

import com.eml.librarybackend.domain.entity.Categoria;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

@Entity
public class RecursoAudio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAudio;
    private Date fechaCarga;
    private String urlAudio;
    private String descripcionAudio;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    public RecursoAudio() {
    }

    public RecursoAudio(int idAudio, Date fechaCarga, String urlAudio, String descripcionAudio, Categoria categoria) {
        this.idAudio = idAudio;
        this.fechaCarga = fechaCarga;
        this.urlAudio = urlAudio;
        this.descripcionAudio = descripcionAudio;
        this.categoria = categoria;
    }

    public int getIdAudio() {
        return idAudio;
    }

    public void setIdAudio(int idAudio) {
        this.idAudio = idAudio;
    }

    public Date getFechaCarga() {
        return fechaCarga;
    }

    public void setFechaCarga(Date fechaCarga) {
        this.fechaCarga = fechaCarga;
    }

    public String getUrlAudio() {
        return urlAudio;
    }

    public void setUrlAudio(String urlAudio) {
        this.urlAudio = urlAudio;
    }

    public String getDescripcionAudio() {
        return descripcionAudio;
    }

    public void setDescripcionAudio(String descripcionAudio) {
        this.descripcionAudio = descripcionAudio;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
