package com.eml.librarybackend.config.security.service;

import com.eml.librarybackend.config.security.entity.Rol;
import com.eml.librarybackend.config.security.repository.RolRepository;
import com.eml.librarybackend.config.security.enums.RolNombre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RolService {

    @Autowired
    RolRepository rolRepository;

    public Optional<Rol> getByRolNombre(RolNombre rolNombre){
        return rolRepository.findByRolNombre(rolNombre);
    }

    public void save(Rol rol){
        rolRepository.save(rol);
    }
}
