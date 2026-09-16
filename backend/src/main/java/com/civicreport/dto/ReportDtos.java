package com.civicreport.dto;

import com.civicreport.model.Report;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public class ReportDtos {

    public record CreateReportRequest(
            @NotBlank @Size(max = 140) String title,
            @NotBlank @Size(max = 2000) String description,
            @NotBlank String category,
            String photoUrl,
            @NotNull Double latitude,
            @NotNull Double longitude
    ) {}

    public record UpdateStatusRequest(
            @NotNull Report.ReportStatus status,
            String note
    ) {}

    public record ReportResponse(
            String id,
            String title,
            String description,
            String category,
            String photoUrl,
            double latitude,
            double longitude,
            String status,
            int upvoteCount,
            String userId,
            String authorityNote,
            Instant createdAt,
            Instant updatedAt
    ) {
        public static ReportResponse from(Report r) {
            return new ReportResponse(
                    r.getId(),
                    r.getTitle(),
                    r.getDescription(),
                    r.getCategory(),
                    r.getPhotoUrl(),
                    r.getLocation().getY(),
                    r.getLocation().getX(),
                    r.getStatus().name(),
                    r.getUpvotes().size(),
                    r.getUserId(),
                    r.getAuthorityNote(),
                    r.getCreatedAt(),
                    r.getUpdatedAt()
            );
        }
    }
}
