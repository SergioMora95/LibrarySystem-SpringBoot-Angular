package com.eml.librarybackend.service;

import com.eml.librarybackend.entity.Prestamo;
import com.eml.librarybackend.repository.PrestamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    public List<Prestamo> list() {
        return prestamoRepository.findAll();
    }

    public Optional<Prestamo> getOne(int id) {
        return prestamoRepository.findById(id);
    }

    public List<Prestamo> findByEstado(String estado) {
        return prestamoRepository.findByEstadoPrestamo(estado);
    }

    public void save(Prestamo prestamo) {
        prestamoRepository.save(prestamo);
    }

    public void delete(int id) {
        prestamoRepository.deleteById(id);
    }

    public boolean existsById(int id) {
        return prestamoRepository.existsById(id);
    }

    public List<Prestamo> getPrestamosPorUsuario(Integer userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isUser = authentication.getAuthorities().stream()
                .anyMatch(r -> r.getAuthority().equals("ROLE_USER"));
        if (isUser) {
            return prestamoRepository.findByUsuarioId(userId);
        } else {
            return prestamoRepository.findAll();
        }
    }

    public void renovarPrestamo(int idPrestamo) {
        Prestamo prestamo = prestamoRepository.findById(idPrestamo)
                .orElseThrow(() -> new RuntimeException("Prestamo no encontrado"));

        if (prestamo.getVecesRenovado() > 0) {
            throw new RuntimeException("El préstamo ya ha sido renovado previamente");
        }

        LocalDate nuevaFechaVencimiento = LocalDate.now().plusDays(15);

        prestamo.setFechaDevolucion(java.sql.Date.valueOf(nuevaFechaVencimiento));

        prestamo.setVecesRenovado(1);
        prestamo.setUltimaFechaRenovacion(new Date());

        prestamoRepository.save(prestamo);
    }


}
