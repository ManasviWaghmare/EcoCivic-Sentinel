# Civic Report - Backend

Spring Boot 3 + MongoDB + JWT backend for the Civic Report platform.

## Prerequisites

- Java 21+
- Maven 3.9+
- MongoDB running on `localhost:27017` (or set `SPRING_DATA_MONGODB_URI`)

## Run

```bash
cd backend
./mvnw spring-boot:run        # or: mvn spring-boot:run
```

Server starts on **http://localhost:8080**.

On first startup a seeded authority account is created:

| Role      | Email               | Password       |
|-----------|---------------------|----------------|
| AUTHORITY | authority@city.gov  | authority123   |

Public registration always creates `CITIZEN` accounts.

## API Overview

| Method | Endpoint                        | Auth            | Description                          |
|--------|---------------------------------|-----------------|--------------------------------------|
| POST   | `/api/auth/register`            | Public          | Register (role = CITIZEN)            |
| POST   | `/api/auth/login`               | Public          | Login, returns JWT                   |
| GET    | `/api/reports`                  | Public          | List reports (`?status=&category=`)  |
| GET    | `/api/reports/{id}`             | Public          | Get one report                       |
| GET    | `/api/reports/nearby`           | Public          | Geo search (`?lat=&lng=&distanceKm=`)|
| POST   | `/api/reports`                  | Any user        | Create report (JWT required)         |
| GET    | `/api/reports/my`               | Any user        | Current user's reports               |
| POST   | `/api/reports/{id}/upvote`      | Any user        | Toggle upvote                        |
| PATCH  | `/api/reports/{id}/status`      | AUTHORITY only  | Update status + note                 |

Auth header for protected endpoints: `Authorization: Bearer <jwt>`
