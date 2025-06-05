package com.eduextra.config;

import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Clase para personalizar la documentación de OpenAPI para incluir respuestas
 * de error globales en todos los endpoints.
 */
@Configuration
public class SwaggerResponseConfig {

    @Bean
    public OperationCustomizer customizeOperationResponses() {
        return (operation, handlerMethod) -> {
            // Si no tiene respuestas configuradas o si la operación no tiene descripción, no procesar
            if (operation.getResponses() == null || operation.getDescription() == null) {
                return operation;
            }

            // Agregar respuestas de error estándar si no existen
            ApiResponses responses = operation.getResponses();
            
            // Error 400 - Bad Request
            if (responses.get("400") == null) {
                ApiResponse badRequestResponse = new ApiResponse()
                    .description("Error de validación o solicitud incorrecta");
                // No asignamos esquema automáticamente para evitar conflictos con controllers
                responses.addApiResponse("400", badRequestResponse);
            }
            
            // Error 401 - Unauthorized
            if (responses.get("401") == null) {
                ApiResponse unauthorizedResponse = new ApiResponse()
                    .description("No autorizado - Autenticación requerida");
                // No asignamos esquema automáticamente para evitar conflictos con controllers
                responses.addApiResponse("401", unauthorizedResponse);
            }
            
            // Error 403 - Forbidden
            if (responses.get("403") == null) {
                ApiResponse forbiddenResponse = new ApiResponse()
                    .description("Prohibido - No tiene permisos para acceder a este recurso");
                // No asignamos esquema automáticamente para evitar conflictos con controllers
                responses.addApiResponse("403", forbiddenResponse);
            }
            
            // Error 404 - Not Found
            if (responses.get("404") == null) {
                ApiResponse notFoundResponse = new ApiResponse()
                    .description("Recurso no encontrado");
                // No asignamos esquema automáticamente para evitar conflictos con controllers
                responses.addApiResponse("404", notFoundResponse);
            }
            
            // Error 500 - Internal Server Error
            if (responses.get("500") == null) {
                ApiResponse serverErrorResponse = new ApiResponse()
                    .description("Error interno del servidor");
                // No asignamos esquema automáticamente para evitar conflictos con controllers
                responses.addApiResponse("500", serverErrorResponse);
            }
            
            return operation;
        };
    }
}
