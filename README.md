# 🌿 EcoCivic Sentinel.

**A gamified civic reporting platform to report, track & resolve environmental issues in real-time.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://eco-civic-sentinel-4fy3yvk2e-manasvi15.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/ManasviWaghmare/EcoCivic-Sentinel)
[![Built with](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Backend](https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io)


___

## 🌐 Live Demo

**Frontend:** [https://eco-civic-sentinel-4fy3yvk2e-manasvi15.vercel.app](https://eco-civic-sentinel-4fy3yvk2e-manasvi15.vercel.app)

**GitHub Repository:** [https://github.com/ManasviWaghmare/EcoCivic-Sentinel](https://github.com/ManasviWaghmare/EcoCivic-Sentinel)


___

## 📖 Overview

EcoCivic Sentinel empowers citizens and local authorities to collaboratively monitor and improve environmental health and fire safety. Citizens can report hazards (fires, floods, pollution, illegal dumping), earn XP/rewards, and track community impact. Authorities can review submissions, update status, dispatch responders, and monitor city-wide KPIs.

The platform features real-time emergency alerts, carbon offset tracking, DEI & equity metrics, interactive maps, and a full incident management log.


___

## ✨ Key Features

### 🔐 Authentication & Roles
- Secure JWT-based login
- Two roles: **CITIZEN** and **AUTHORITY**
- Quick demo access buttons + email/password sign-in
- Public registration creates Citizen accounts

### 🚨 Active Emergency Alerts
- Persistent alert banner for live incidents (e.g. Wildfire Watch & Air Quality Advisory)
- Shows affected ward, active responders, and one-click dispatch

### 📊 Sustainability Dashboard
- **Sustaina Impact Score** – Monthly engagement & eco-actions chart
- **Trees Planted & CO₂ Offset** – Live community total
- **Carbon Offsets & Emergency Frequency** – Trend visualization
- **Carbon Offset Target** – City milestone progress

### ⚖️ City DEI & Equity Score
- Gender Equity, Race Equity, Resource Access, Inclusion Index
- Radial progress visualization

### 👥 Ward Participation
- Gender-based headcount breakdown per ward

### 🎯 Sustainability & Fire Readiness KPIs
- Reduce non-renewable energy dependence
- GHG emission reduction goals
- Fire hydrant readiness & flood defense progress

### ✅ Action Items & Preparedness Pledges
- Volunteer pledges with due dates and progress tracking

### 📋 Environmental & Emergency Incident Log
Searchable table of citizen reports with:

| Field | Description |
|-------|-------------|
| Reporter | Citizen who submitted |
| Category | FIRE, FLOOD, DUMPING, POLLUTION, ECO, etc. |
| Description | Incident details |
| Location | Ward / specific place |
| Urgency | CRITICAL / HIGH / MEDIUM / LOW |
| Impact / Offset | Estimated CO₂ impact |
| Status | IN_PROGRESS / IN_REVIEW / SUBMITTED / RESOLVED |

### 🗺️ Interactive Map (Leaflet)
- World Map view with OpenStreetMap tiles
- Geo-location support for nearby reports


___

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 + TypeScript | UI Framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS | Styling & responsive design |
| Leaflet.js + react-leaflet | Interactive maps |
| react-router-dom | Client-side routing |

### Backend
| Technology | Purpose |
|------------|---------|
| Java 21 | Programming language |
| Spring Boot 3.3.4 | Backend framework |
| Spring Security + JWT | Authentication & authorization |
| Lombok | Boilerplate reduction |
| Maven | Build tool |

### Database & Storage
| Technology | Purpose |
|------------|---------|
| MongoDB Atlas | Primary database (GeoJSON support) |
| Cloudinary | Image storage (optional / planned) |

### Hosting
| Layer | Platform |
|-------|----------|
| Frontend | Vercel |
| Backend | Render (Docker) |
| Database | MongoDB Atlas |


___

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **Java 21+**
- **Maven 3.9+**
- MongoDB (local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/ManasviWaghmare/EcoCivic-Sentinel.git
cd EcoCivic-Sentinel
```

### 2. Backend Setup
```bash
cd backend
./mvnw spring-boot:run
# or: mvn spring-boot:run
```
Backend starts at **http://localhost:8080**

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend starts at **http://localhost:5173**


___

## 🔑 Demo Credentials

| Role       | Email                | Password     |
|------------|----------------------|--------------|
| Authority  | authority@city.gov   | authority123 |
| Citizen    | Register a new account or use the Quick Demo buttons | – |


___

## 📡 API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register (role = CITIZEN) |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/reports` | Public | List reports (`?status=&category=`) |
| GET | `/api/reports/{id}` | Public | Get one report |
| GET | `/api/reports/nearby` | Public | Geo search (`?lat=&lng=&distanceKm=`) |
| POST | `/api/reports` | Any user | Create report (JWT required) |
| GET | `/api/reports/my` | Any user | Current user's reports |
| POST | `/api/reports/{id}/upvote` | Any user | Toggle upvote |
| PATCH | `/api/reports/{id}/status` | AUTHORITY only | Update status + note |

Use header: `Authorization: Bearer <jwt>`


___

## 📁 Project Structure

```
EcoCivic-Sentinel/
├── backend/                 # Spring Boot API
│   ├── src/main/java/...
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                # React + Vite app
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── .github/workflows/       # CI/CD
└── README.md
```


___

## 🗺️ Roadmap

- [ ] Full real-time map with live hazard markers
- [ ] Push / email notifications for emergency alerts
- [ ] Mobile-responsive citizen reporting flow
- [ ] Expanded XP & Rewards system
- [ ] Cloudinary image upload integration
- [ ] Multi-language support
- [ ] Weather & air quality API integration


___

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


___

## 📄 License

This project is open source. See the repository for license details.


___

**EcoCivic Sentinel** — Empowering communities to protect their environment and stay fire-safe, together.

Built by [Manasvi Waghmare,Abhishek Kute ,Chaitanya Retawade,Anand Singh](https://github.com/ManasviWaghmare)
