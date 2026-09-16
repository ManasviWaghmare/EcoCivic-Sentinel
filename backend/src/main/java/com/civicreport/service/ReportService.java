package com.civicreport.service;

import com.civicreport.dto.ReportDtos.CreateReportRequest;
import com.civicreport.dto.ReportDtos.ReportResponse;
import com.civicreport.model.Report;
import com.civicreport.model.Report.ReportStatus;
import com.civicreport.repository.ReportRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public ReportResponse create(CreateReportRequest request, String userId) {
        Report report = Report.builder()
                .title(request.title())
                .description(request.description())
                .category(request.category())
                .photoUrl(request.photoUrl())
                .location(new GeoJsonPoint(request.longitude(), request.latitude()))
                .status(ReportStatus.SUBMITTED)
                .userId(userId)
                .upvotes(new ArrayList<>())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
        return ReportResponse.from(reportRepository.save(report));
    }

    public List<ReportResponse> list(ReportStatus status, String category) {
        List<Report> reports;
        if (status != null && category != null) {
            reports = reportRepository.findByStatusAndCategory(status, category);
        } else if (status != null) {
            reports = reportRepository.findByStatus(status);
        } else if (category != null) {
            reports = reportRepository.findByCategory(category);
        } else {
            reports = reportRepository.findAll(
                    Sort.by(Sort.Direction.DESC, "createdAt"));
        }
        return reports.stream().map(ReportResponse::from).toList();
    }

    public ReportResponse getById(String id) {
        return ReportResponse.from(findById(id));
    }

    public List<ReportResponse> findByUser(String userId) {
        return reportRepository.findByUserId(userId).stream()
                .map(ReportResponse::from)
                .toList();
    }

    public List<ReportResponse> findNearby(double latitude, double longitude, double distanceKm) {
        Point point = new Point(longitude, latitude);
        Distance distance = new Distance(distanceKm, Metrics.KILOMETERS);
        List<Report> reports = new ArrayList<>();
        reportRepository.findByLocationNear(point, distance)
                .forEach(result -> reports.add(result.getContent()));
        return reports.stream().map(ReportResponse::from).toList();
    }

    public ReportResponse updateStatus(String id, ReportStatus status, String note) {
        Report report = findById(id);
        report.setStatus(status);
        report.setAuthorityNote(note);
        report.setUpdatedAt(Instant.now());
        return ReportResponse.from(reportRepository.save(report));
    }

    public ReportResponse toggleUpvote(String id, String userId) {
        Report report = findById(id);
        if (report.getUpvotes().contains(userId)) {
            report.getUpvotes().remove(userId);
        } else {
            report.getUpvotes().add(userId);
        }
        return ReportResponse.from(reportRepository.save(report));
    }

    private Report findById(String id) {
        return reportRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Report not found"));
    }
}
