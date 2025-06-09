package com.eduextra.config;

import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Class to customize OpenAPI documentation to include global error
 * responses on all endpoints.
 */
@Configuration
public class SwaggerResponseConfig {

    @Bean
    public OperationCustomizer customizeOperationResponses() {
        return (operation, handlerMethod) -> {
            // If no responses are configured or the operation has no description, skip processing
            if (operation.getResponses() == null || operation.getDescription() == null) {
                return operation;
            }

            // Add standard error responses if they don't exist
            ApiResponses responses = operation.getResponses();
            
            // Error 400 - Bad Request
            if (responses.get("400") == null) {
                ApiResponse badRequestResponse = new ApiResponse()
                    .description("Validation error or bad request");
                // We don't automatically assign a schema to avoid conflicts with controllers
                responses.addApiResponse("400", badRequestResponse);
            }
            
            // Error 401 - Unauthorized
            if (responses.get("401") == null) {
                ApiResponse unauthorizedResponse = new ApiResponse()
                    .description("Unauthorized - Authentication required");
                // We don't automatically assign a schema to avoid conflicts with controllers
                responses.addApiResponse("401", unauthorizedResponse);
            }
            
            // Error 403 - Forbidden
            if (responses.get("403") == null) {
                ApiResponse forbiddenResponse = new ApiResponse()
                    .description("Forbidden - You don't have permission to access this resource");
                // We don't automatically assign a schema to avoid conflicts with controllers
                responses.addApiResponse("403", forbiddenResponse);
            }
            
            // Error 404 - Not Found
            if (responses.get("404") == null) {
                ApiResponse notFoundResponse = new ApiResponse()
                    .description("Resource not found");
                // We don't automatically assign a schema to avoid conflicts with controllers
                responses.addApiResponse("404", notFoundResponse);
            }
            
            // Error 500 - Internal Server Error
            if (responses.get("500") == null) {
                ApiResponse serverErrorResponse = new ApiResponse()
                    .description("Internal server error");
                // We don't automatically assign a schema to avoid conflicts with controllers
                responses.addApiResponse("500", serverErrorResponse);
            }
            
            return operation;
        };
    }
}
