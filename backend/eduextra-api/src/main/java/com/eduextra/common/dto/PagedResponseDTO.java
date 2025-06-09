package com.eduextra.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Generic DTO for paginated responses
 * Contains data, pagination metadata, and optional filters
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Paginated response wrapper")
public class PagedResponseDTO<T> {
    
    @Schema(description = "List of items in current page")
    private List<T> content;
    
    @Schema(description = "Current page number (0-based)", example = "0")
    private int page;
    
    @Schema(description = "Number of items per page", example = "20")
    private int size;
    
    @Schema(description = "Total number of items", example = "100")
    private long totalElements;
    
    @Schema(description = "Total number of pages", example = "5")
    private int totalPages;
    
    @Schema(description = "Whether this is the first page", example = "true")
    private boolean first;
    
    @Schema(description = "Whether this is the last page", example = "false")
    private boolean last;
    
    @Schema(description = "Whether there are more pages after this one", example = "true")
    private boolean hasNext;
    
    @Schema(description = "Whether there are pages before this one", example = "false")
    private boolean hasPrevious;
}
