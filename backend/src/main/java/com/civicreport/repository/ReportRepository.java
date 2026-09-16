package com.civicreport.repository;

import com.civicreport.model.Report;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReportRepository extends MongoRepository<Report, String> {

    List<Report> findByStatus(Report.ReportStatus status);

    List<Report> findByCategory(String category);

    List<Report> findByStatusAndCategory(Report.ReportStatus status, String category);

    List<Report> findByUserId(String userId);

    GeoResults<Report> findByLocationNear(Point location, Distance distance);
}
