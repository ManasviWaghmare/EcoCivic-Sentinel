package com.civicreport.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "reports")
public class Report {

    public enum ReportStatus { SUBMITTED, IN_REVIEW, IN_PROGRESS, RESOLVED }

    @Id
    private String id;

    private String title;

    private String description;

    private String category;

    private String photoUrl;

    /** GeoJSON point: x = longitude, y = latitude */
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location;

    private ReportStatus status;

    private String userId;

    private List<String> upvotes = new ArrayList<>();

    /** Optional note added by authority when updating status */
    private String authorityNote;

    private Instant createdAt;

    private Instant updatedAt;

    public Report() {}

    public Report(String id, String title, String description, String category, String photoUrl,
                  GeoJsonPoint location, ReportStatus status, String userId, List<String> upvotes,
                  String authorityNote, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.photoUrl = photoUrl;
        this.location = location;
        this.status = status;
        this.userId = userId;
        this.upvotes = upvotes != null ? upvotes : new ArrayList<>();
        this.authorityNote = authorityNote;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ReportBuilder builder() {
        return new ReportBuilder();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public GeoJsonPoint getLocation() { return location; }
    public void setLocation(GeoJsonPoint location) { this.location = location; }

    public ReportStatus getStatus() { return status; }
    public void setStatus(ReportStatus status) { this.status = status; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<String> getUpvotes() { return upvotes; }
    public void setUpvotes(List<String> upvotes) { this.upvotes = upvotes; }

    public String getAuthorityNote() { return authorityNote; }
    public void setAuthorityNote(String authorityNote) { this.authorityNote = authorityNote; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static class ReportBuilder {
        private String id;
        private String title;
        private String description;
        private String category;
        private String photoUrl;
        private GeoJsonPoint location;
        private ReportStatus status;
        private String userId;
        private List<String> upvotes = new ArrayList<>();
        private String authorityNote;
        private Instant createdAt;
        private Instant updatedAt;

        ReportBuilder() {}

        public ReportBuilder id(String id) { this.id = id; return this; }
        public ReportBuilder title(String title) { this.title = title; return this; }
        public ReportBuilder description(String description) { this.description = description; return this; }
        public ReportBuilder category(String category) { this.category = category; return this; }
        public ReportBuilder photoUrl(String photoUrl) { this.photoUrl = photoUrl; return this; }
        public ReportBuilder location(GeoJsonPoint location) { this.location = location; return this; }
        public ReportBuilder status(ReportStatus status) { this.status = status; return this; }
        public ReportBuilder userId(String userId) { this.userId = userId; return this; }
        public ReportBuilder upvotes(List<String> upvotes) { this.upvotes = upvotes; return this; }
        public ReportBuilder authorityNote(String authorityNote) { this.authorityNote = authorityNote; return this; }
        public ReportBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public ReportBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Report build() {
            return new Report(id, title, description, category, photoUrl, location, status, userId, upvotes, authorityNote, createdAt, updatedAt);
        }
    }
}
