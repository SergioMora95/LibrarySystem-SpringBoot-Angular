package com.tutorial.crud.controller;
import com.tutorial.crud.Archivo.StorageService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("media")
@CrossOrigin(origins = "https://wksvzctx-4200.use2.devtunnels.ms")
@AllArgsConstructor
public class Mediacontroller {

    private final StorageService storageService;
    private final HttpServletRequest request;

    @PostMapping("upload")
    public Map<String, String> uploadFile(@RequestParam("file") MultipartFile multipartFile) {
        Map<String, String> map = new HashMap<>();
        try {
            String path = storageService.store(multipartFile);
            String host = request.getRequestURL().toString().replace(request.getRequestURI(), "");
            String url = ServletUriComponentsBuilder
                    .fromHttpUrl(host)
                    .path("/media/")
                    .path(path)
                    .toUriString();
            map.put("url", url);
        } catch (Exception e) {
            map.put("error", "Error al subir el archivo: " + e.getMessage());
        }
        return map;
    }

    @GetMapping("{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        Resource file = storageService.loadResource(filename);
        String contentType = Files.probeContentType(file.getFile().toPath());

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(file);
    }
}
