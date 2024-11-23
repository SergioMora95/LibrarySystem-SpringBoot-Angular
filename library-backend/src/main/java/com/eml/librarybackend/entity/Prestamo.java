package com.eml.librarybackend.entity;

import com.eml.librarybackend.security.entity.Usuario;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Date;

@Entity
public class Prestamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPrestamo;
    private int cantidadPrestamo;
    private Date fechaDevolucion;
    private Date fechaPrestamo;
    private String observacionPrestamo;
    private String estadoPrestamo;
    private int vecesRenovado;
    private Date ultimaFechaRenovacion;

    @ManyToOne
    @JoinColumn(name = "id_libro")
    private Libro libro;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    public Prestamo() {
    }

    public Prestamo(int idPrestamo, int cantidadPrestamo, Date fechaDevolucion, Date fechaPrestamo, String observacionPrestamo, String estadoPrestamo, int vecesRenovado, Date ultimaFechaRenovacion, Libro libro, Usuario usuario) {
        this.idPrestamo = idPrestamo;
        this.cantidadPrestamo = cantidadPrestamo;
        this.fechaDevolucion = fechaDevolucion;
        this.fechaPrestamo = fechaPrestamo;
        this.observacionPrestamo = observacionPrestamo;
        this.estadoPrestamo = estadoPrestamo;
        this.vecesRenovado = vecesRenovado;
        this.ultimaFechaRenovacion = ultimaFechaRenovacion;
        this.libro = libro;
        this.usuario = usuario;
    }

    public int getIdPrestamo() {
        return idPrestamo;
    }

    public void setIdPrestamo(int idPrestamo) {
        this.idPrestamo = idPrestamo;
    }

    public int getCantidadPrestamo() {
        return cantidadPrestamo;
    }

    public void setCantidadPrestamo(int cantidadPrestamo) {
        this.cantidadPrestamo = cantidadPrestamo;
    }

    public Date getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(Date fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public Date getFechaPrestamo() {
        return fechaPrestamo;
    }

    public void setFechaPrestamo(Date fechaPrestamo) {
        this.fechaPrestamo = fechaPrestamo;
    }

    public String getObservacionPrestamo() {
        return observacionPrestamo;
    }

    public void setObservacionPrestamo(String observacionPrestamo) {
        this.observacionPrestamo = observacionPrestamo;
    }

    public String getEstadoPrestamo() {
        return estadoPrestamo;
    }

    public void setEstadoPrestamo(String estadoPrestamo) {
        this.estadoPrestamo = estadoPrestamo;
    }

    public int getVecesRenovado() {
        return vecesRenovado;
    }

    public void setVecesRenovado(int vecesRenovado) {
        this.vecesRenovado = vecesRenovado;
    }

    public Date getUltimaFechaRenovacion() {
        return ultimaFechaRenovacion;
    }

    public void setUltimaFechaRenovacion(Date ultimaFechaRenovacion) {
        this.ultimaFechaRenovacion = ultimaFechaRenovacion;
    }

    public Libro getLibro() {
        return libro;
    }

    public void setLibro(Libro libro) {
        this.libro = libro;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
