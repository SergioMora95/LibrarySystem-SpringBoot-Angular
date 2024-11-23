package com.eml.librarybackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

@Entity
public class RecursoVideo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVideo;
    private Date fechaCarga;
    private String urlVideo;
    private String descripcionVideo;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    public RecursoVideo() {
    }

    public RecursoVideo(int idVideo, Date fechaCarga, String urlVideo, String descripcionVideo, Categoria categoria) {
        this.idVideo = idVideo;
        this.fechaCarga = fechaCarga;
        this.urlVideo = urlVideo;
        this.descripcionVideo = descripcionVideo;
        this.categoria = categoria;
    }

    public int getIdVideo() {
        return idVideo;
    }

    public void setIdVideo(int idVideo) {
        this.idVideo = idVideo;
    }

    public Date getFechaCarga() {
        return fechaCarga;
    }

    public void setFechaCarga(Date fechaCarga) {
        this.fechaCarga = fechaCarga;
    }

    public String getUrlVideo() {
        return urlVideo;
    }

    public void setUrlVideo(String urlVideo) {
        this.urlVideo = urlVideo;
    }

    public String getDescripcionVideo() {
        return descripcionVideo;
    }

    public void setDescripcionVideo(String descripcionVideo) {
        this.descripcionVideo = descripcionVideo;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
