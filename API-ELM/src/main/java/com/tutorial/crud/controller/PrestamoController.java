package com.tutorial.crud.controller;

import com.tutorial.crud.dto.Mensaje;
import com.tutorial.crud.entity.Prestamo;
import com.tutorial.crud.security.entity.Usuario;
import com.tutorial.crud.security.service.UsuarioService;
import com.tutorial.crud.service.LibroService;
import com.tutorial.crud.service.PrestamoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestamo")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private LibroService libroService;

    @GetMapping("/lista")
    public ResponseEntity<List<Prestamo>> list(){
        List<Prestamo> list = prestamoService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") int id){
        if(!prestamoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        Prestamo prestamo = prestamoService.getOne(id).orElse(null);
        return new ResponseEntity<>(prestamo, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Prestamo prestamo){
        if(StringUtils.isBlank(prestamo.getObservacionPrestamo()))
            return new ResponseEntity<>(new Mensaje("la observación es obligatoria"), HttpStatus.BAD_REQUEST);
        if(prestamo.getFechaPrestamo() == null)
            return new ResponseEntity<>(new Mensaje("la fecha de préstamo es obligatoria"), HttpStatus.BAD_REQUEST);
        prestamoService.save(prestamo);
        return new ResponseEntity<>(new Mensaje("préstamo creado"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable("id") int id, @RequestBody Prestamo prestamoUpdated){
        if(!prestamoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        if(StringUtils.isBlank(prestamoUpdated.getObservacionPrestamo()))
            return new ResponseEntity<>(new Mensaje("la observación es obligatoria"), HttpStatus.BAD_REQUEST);
        if(prestamoUpdated.getFechaPrestamo() == null)
            return new ResponseEntity<>(new Mensaje("la fecha de préstamo es obligatoria"), HttpStatus.BAD_REQUEST);

        Prestamo prestamo = prestamoService.getOne(id).orElse(null);
        if (prestamo != null) {
            prestamo.setObservacionPrestamo(prestamoUpdated.getObservacionPrestamo());
            prestamo.setFechaPrestamo(prestamoUpdated.getFechaPrestamo());
            prestamo.setFechaDevolucion(prestamoUpdated.getFechaDevolucion());
            prestamo.setEstadoPrestamo(prestamoUpdated.getEstadoPrestamo());
            prestamo.setCantidadPrestamo(prestamoUpdated.getCantidadPrestamo());
            prestamo.setUsuario(prestamoUpdated.getUsuario());
            prestamo.setLibro(prestamoUpdated.getLibro());

            prestamoService.save(prestamo);
            return new ResponseEntity<>(new Mensaje("préstamo actualizado"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Mensaje("el préstamo no se pudo actualizar"), HttpStatus.BAD_REQUEST);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id){
        if(!prestamoService.existsById(id))
            return new ResponseEntity<>(new Mensaje("no existe"), HttpStatus.NOT_FOUND);
        prestamoService.delete(id);
        return new ResponseEntity<>(new Mensaje("préstamo eliminado"), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    // Métodos para listar préstamos por estado
    @GetMapping("/devueltos")
    public ResponseEntity<List<Prestamo>> listDevueltos() {
        List<Prestamo> prestamos = prestamoService.findByEstado("Devuelto");
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/noDevueltos")
    public ResponseEntity<List<Prestamo>> listNoDevueltos() {
        List<Prestamo> prestamos = prestamoService.findByEstado("NoDevuelto");
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/prestados")
    public ResponseEntity<List<Prestamo>> listPrestados() {
        List<Prestamo> prestamos = prestamoService.findByEstado("Prestado");
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
    }

    @GetMapping("/misPrestamos")
    public ResponseEntity<?> obtenerMisPrestamos() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Usuario usuario = usuarioService.findByNombreUsuario(userDetails.getUsername()).orElse(null);
        if (usuario != null) {
            List<Prestamo> prestamos = prestamoService.getPrestamosPorUsuario(usuario.getId());
            // Verificar si el libro asociado a cada préstamo existe antes de devolver la respuesta
            prestamos.forEach(prestamo -> {
                if (prestamo.getLibro() != null && !libroService.existsById(prestamo.getLibro().getIdLibro())) {
                    prestamo.setLibro(null);
                }
            });
            return new ResponseEntity<>(prestamos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Mensaje("Usuario no encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/renovar/{id}")
    public ResponseEntity<?> renovarPrestamo(@PathVariable("id") int id) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Usuario usuario = usuarioService.findByNombreUsuario(userDetails.getUsername()).orElse(null);
        if (usuario == null) {
            return new ResponseEntity<>(new Mensaje("Usuario no encontrado"), HttpStatus.NOT_FOUND);
        }

        Prestamo prestamo = prestamoService.getOne(id).orElse(null);
        if (prestamo == null || prestamo.getUsuario() == null || prestamo.getUsuario().getId() != usuario.getId()) {
            return new ResponseEntity<>(new Mensaje("No tienes permiso para renovar este préstamo"), HttpStatus.UNAUTHORIZED);
        }

        if (prestamo.getVecesRenovado() > 0) {
            return new ResponseEntity<>(new Mensaje("Este préstamo ya ha sido renovado previamente"), HttpStatus.BAD_REQUEST);
        }
        prestamoService.renovarPrestamo(id);

        return new ResponseEntity<>(new Mensaje("Préstamo renovado exitosamente"), HttpStatus.OK);
    }

}
