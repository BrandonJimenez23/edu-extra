package com.eduextra.exception;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Respuesta estándar para errores en la API")
public class ErrorResponse {

    @Schema(example = "404", description = "Código de estado HTTP")
    private final int statusCode;

    @Schema(example = "El usuario no fue encontrado", description = "Mensaje explicativo del error")
    private final String message;

    @Schema(example = "/users/5", description = "Ruta de la petición que causó el error")
    private final String path;

    public ErrorResponse(int statusCode, String message, String path) {
        this.statusCode = statusCode;
        this.message = message;
        this.path = path;
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
}
