package com.eduextra.exception;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.HashMap;
import java.util.Map;

@Schema(description = "Respuesta estándar para errores en la API")
public class ErrorResponse {

    @Schema(example = "404", description = "Código de estado HTTP")
    private final int statusCode;

    @Schema(example = "El usuario no fue encontrado", description = "Mensaje explicativo del error")
    private final String message;

    @Schema(example = "/users/5", description = "Ruta de la petición que causó el error")
    private final String path;
    
    @Schema(description = "Errores de validación detallados por campo")
    private Map<String, String> validationErrors;

    public ErrorResponse(int statusCode, String message, String path) {
        this.statusCode = statusCode;
        this.message = message;
        this.path = path;
        this.validationErrors = new HashMap<>();
    }
    
    public ErrorResponse(int statusCode, String message, String path, Map<String, String> validationErrors) {
        this.statusCode = statusCode;
        this.message = message;
        this.path = path;
        this.validationErrors = validationErrors != null ? validationErrors : new HashMap<>();
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }
    
    public Map<String, String> getValidationErrors() {
        return validationErrors;
    }
    
    public void addValidationError(String field, String errorMessage) {
        if (this.validationErrors == null) {
            this.validationErrors = new HashMap<>();
        }
        this.validationErrors.put(field, errorMessage);
    }
}
