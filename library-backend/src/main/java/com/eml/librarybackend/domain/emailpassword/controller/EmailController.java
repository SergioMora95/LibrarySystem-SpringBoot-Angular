package com.eml.librarybackend.domain.emailpassword.controller;

import com.eml.librarybackend.domain.dto.Mensaje;
import com.eml.librarybackend.domain.emailpassword.dto.ChangePasswordDTO;
import com.eml.librarybackend.domain.emailpassword.dto.EmailValuesDTO;
import com.eml.librarybackend.domain.emailpassword.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/email-password")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
public class EmailController {

    @Autowired
    EmailService emailService;


    @PostMapping("/send-email")
    public ResponseEntity<Mensaje> sendEmailTemplate(@RequestBody EmailValuesDTO dto) {
        return ResponseEntity.ok(emailService.sendEmailTemplate(dto));
    }

    @PostMapping("/send-emailPrestamo")
    public ResponseEntity<Mensaje> sendEmailTemplatePrestamo(@RequestBody EmailValuesDTO dto) {
        return ResponseEntity.ok(emailService.sendEmailTemplatePrestamo(dto));
    }

    @PostMapping("/change-password")
    public ResponseEntity<Mensaje> changePassword(@Valid @RequestBody ChangePasswordDTO dto) {
        return ResponseEntity.ok(emailService.changePassword(dto));
    }

}