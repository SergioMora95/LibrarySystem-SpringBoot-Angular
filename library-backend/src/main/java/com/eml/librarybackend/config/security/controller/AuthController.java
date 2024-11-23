package com.eml.librarybackend.config.security.controller;

import com.eml.librarybackend.config.security.dto.JwtDto;
import com.eml.librarybackend.config.security.dto.LoginUsuario;
import com.eml.librarybackend.config.security.dto.NuevoUsuario;
import com.eml.librarybackend.config.security.service.UsuarioService;
import com.eml.librarybackend.domain.dto.Mensaje;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class AuthController {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/nuevo")
    public ResponseEntity<Mensaje> nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario){
        return ResponseEntity.ok(usuarioService.save(nuevoUsuario));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUsuario loginUsuario){
        return ResponseEntity.ok(usuarioService.login(loginUsuario));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtDto> refresh(@RequestBody JwtDto jwtDto) throws ParseException {
        return ResponseEntity.ok(usuarioService.refresh(jwtDto));
    }
}
