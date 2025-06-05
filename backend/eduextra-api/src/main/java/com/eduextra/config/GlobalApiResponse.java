package com.eduextra.config;

import com.eduextra.exception.ErrorResponse;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Utility class to represent standard API responses
 * and facilitate integration with Swagger OpenAPI.
 */
@Schema(description = "Standard response structure for the API")
public class GlobalApiResponse<T> {
    
    @Schema(description = "Indicates if the operation was successful")
    private boolean success;
    
    @Schema(description = "Informative message about the operation result")
    private String message;
    
    @Schema(description = "Response data")
    private T data;
    
    @Schema(description = "Error information, only present if success is false")
    private ErrorResponse error;

    @Schema(description = "Timestamp of the response", example = "2025-06-05T10:15:30Z")
    private String timestamp;
    
    // Constructor for successful responses
    public GlobalApiResponse(T data) {
        this.success = true;
        this.message = "Operation completed successfully";
        this.data = data;
        this.timestamp = java.time.ZonedDateTime.now().toString();
    }
    
    // Constructor for successful responses with custom message
    public GlobalApiResponse(T data, String message) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.timestamp = java.time.ZonedDateTime.now().toString();
    }
    
    // Constructor for error responses
    public GlobalApiResponse(ErrorResponse error) {
        this.success = false;
        this.message = error.getMessage();
        this.error = error;
        this.timestamp = java.time.ZonedDateTime.now().toString();
    }
    
    // Getters and setters
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public T getData() {
        return data;
    }
    
    public void setData(T data) {
        this.data = data;
    }
    
    public ErrorResponse getError() {
        return error;
    }
    
    public void setError(ErrorResponse error) {
        this.error = error;
    }
    
    public String getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    
    /**
     * Factory method to create a success response
     */
    public static <T> GlobalApiResponse<T> success(T data) {
        return new GlobalApiResponse<>(data);
    }
    
    /**
     * Factory method to create a success response with custom message
     */
    public static <T> GlobalApiResponse<T> success(T data, String message) {
        return new GlobalApiResponse<>(data, message);
    }
    
    /**
     * Factory method to create an error response
     */
    public static <T> GlobalApiResponse<T> error(ErrorResponse errorResponse) {
        return new GlobalApiResponse<>(errorResponse);
    }
}