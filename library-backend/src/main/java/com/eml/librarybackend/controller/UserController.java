package com.eml.librarybackend.controller;


import com.eml.librarybackend.security.entity.Usuario;
import com.eml.librarybackend.security.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class UserController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/lista")
    public ResponseEntity<List<Usuario>> list() {
        List<Usuario> list = usuarioService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}