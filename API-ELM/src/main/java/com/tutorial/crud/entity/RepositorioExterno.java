package com.tutorial.crud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
public class RepositorioExterno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRepositorio;
    private Date fechaCarga;
    private String urlRepositorio;
    private String descripcionRepositorio;

    public RepositorioExterno() {
    }

    public RepositorioExterno(int idRepositorio, Date fechaCarga, String urlRepositorio, String descripcionRepositorio) {
        this.idRepositorio = idRepositorio;
        this.fechaCarga = fechaCarga;
        this.urlRepositorio = urlRepositorio;
        this.descripcionRepositorio = descripcionRepositorio;
    }

    public int getIdRepositorio() {
        return idRepositorio;
    }

    public void setIdRepositorio(int idRepositorio) {
        this.idRepositorio = idRepositorio;
    }

    public Date getFechaCarga() {
        return fechaCarga;
    }

    public void setFechaCarga(Date fechaCarga) {
        this.fechaCarga = fechaCarga;
    }

    public String getUrlRepositorio() {
        return urlRepositorio;
    }

    public void setUrlRepositorio(String urlRepositorio) {
        this.urlRepositorio = urlRepositorio;
    }

    public String getDescripcionRepositorio() {
        return descripcionRepositorio;
    }

    public void setDescripcionRepositorio(String descripcionRepositorio) {
        this.descripcionRepositorio = descripcionRepositorio;
    }
}
