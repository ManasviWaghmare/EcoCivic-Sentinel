package com.civicreport.controller;

import com.civicreport.dto.ReportDtos.CreateReportRequest;
import com.civicreport.dto.ReportDtos.ReportResponse;
import com.civicreport.dto.ReportDtos.UpdateStatusRequest;
import com.civicreport.model.Report.ReportStatus;
import com.civicreport.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("isAuthenticated()")
    public ReportResponse create(@Valid @RequestBody CreateReportRequest request,
                                 Authentication authentication) {
        return reportService.create(request, authentication.getName());
    }

    @GetMapping
    public List<ReportResponse> list(
            @RequestParam(required = false) ReportStatus status,
            @RequestParam(required = false) String category) {
        return reportService.list(status, category);
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public List<ReportResponse> myReports(Authentication authentication) {
        return reportService.findByUser(authentication.getName());
    }

    @GetMapping("/nearby")
    public List<ReportResponse> nearby(@RequestParam double lat,
                                       @RequestParam double lng,
                                       @RequestParam(defaultValue = "2") double distanceKm) {
        return reportService.findNearby(lat, lng, distanceKm);
    }

    @GetMapping("/{id}")
    public ReportResponse getById(@PathVariable String id) {
        return reportService.getById(id);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('AUTHORITY')")
    public ReportResponse updateStatus(@PathVariable String id,
                                       @Valid @RequestBody UpdateStatusRequest request) {
        return reportService.updateStatus(id, request.status(), request.note());
    }

    @PostMapping("/{id}/upvote")
    @PreAuthorize("isAuthenticated()")
    public ReportResponse upvote(@PathVariable String id, Authentication authentication) {
        return reportService.toggleUpvote(id, authentication.getName());
    }
}
