package com.tutorial.crud.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer mvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/media/**")
                        .allowedOrigins("*")
                        .allowedMethods("*");
            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/media/**")
                        .addResourceLocations("file:///C:/Users/Costagramer/Desktop/PROYECTO FINAL/WEB-ELM/src/assets/mediafiles/")
                        .setCachePeriod(3600)
                        .resourceChain(true);
            }
        };
    }
}
