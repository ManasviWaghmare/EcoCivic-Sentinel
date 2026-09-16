# Civic Report

A community issue reporting platform - citizens report civic problems
(potholes, garbage, streetlights...) on a map, upvote issues, and city
authorities track and resolve them.

## Stack

| Layer    | Tech                                               |
|----------|----------------------------------------------------|
| Backend  | Spring Boot 3.3 (Java 21), Spring Data MongoDB, Spring Security + JWT (jjwt 0.12.6) |
| Frontend | React 18, TypeScript, Vite 5, Leaflet / react-leaflet, react-router-dom |
| Database | MongoDB (GeoJSON 2dsphere index for `$near` queries) |

## Quick Start

**1. Start MongoDB**

```bash
mongod    # or use Docker: docker run -d -p 27017:27017 mongo:7
```

**2. Start the backend** (port 8080)

```bash
cd backend
mvn spring-boot:run
```

**3. Start the frontend** (port 5173, proxies `/api` -> 8080)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Demo Accounts

| Role      | Email              | Password      |
|-----------|--------------------|---------------|
| Authority | authority@city.gov | authority123  |

(Created automatically at backend startup. Register any account as a citizen.)

## Features

- **Home page** - interactive Leaflet map with all reports + status filter chips
- **Report page** - create a report with map-click or GPS location picking
- **Track page** - citizens see their own reports and upvote others
- **Authority dashboard** - filter, change status (SUBMITTED -> IN_REVIEW -> IN_PROGRESS -> RESOLVED), add resolution notes
- **Geo search** - `GET /api/reports/nearby?lat=&lng=&distanceKm=` using MongoDB `$near`
- **JWT auth** - stateless, role-based access (CITIZEN / AUTHORITY)

## Photo Upload

The report form accepts a photo **URL** today. To enable real uploads, hook
Cloudinary (or similar) into `ReportPage.tsx` - the backend already persists
whatever URL it receives in `photoUrl`.
