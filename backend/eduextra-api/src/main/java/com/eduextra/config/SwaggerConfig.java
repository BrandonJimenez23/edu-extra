package com.eduextra.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("EduExtra API")
                        .description("API para la gestión de actividades extraescolares")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("EduExtra")
                                .url("https://eduextra.com")
                                .email("info@eduextra.com"))
                        .license(new License()
                                .name("MIT")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Servidor local"),
                        new Server().url("https://api.eduextra.com").description("Servidor de producción")
                ));
    }
}