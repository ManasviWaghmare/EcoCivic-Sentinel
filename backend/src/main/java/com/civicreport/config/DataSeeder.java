package com.civicreport.config;

import com.civicreport.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    public static final String AUTHORITY_EMAIL = "authority@city.gov";

    private final AuthService authService;

    public DataSeeder(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public void run(String... args) {
        authService.createAuthorityUser(AUTHORITY_EMAIL, "authority123", "City Authority");
        log.info("Seeded authority account: {} / authority123", AUTHORITY_EMAIL);
    }
}
