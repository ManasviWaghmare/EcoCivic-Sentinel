I've read your full project document! Here's the **complete tech stack tailored exactly to your actual codebase**:

---

## 🛠️ Complete Tech Stack — Civic Report / EcoCivic Sentinel

### Based on your [`Detailed Structure and architecture.docx`](13247#:~:text=Here's%20the%20complete,Civic%20Report%20project.)

---

## 🖥️ Frontend

| Technology | Purpose | Version |
|---|---|---|
| **HTML + CSS + JS** | Base structure | — |
| **Tailwind CSS** | Styling & responsive design | 3.x |
| **TypeScript** | Type safety (already in your `tsconfig.json`) | 5.x |
| **React 18** | UI Framework (already in your `package.json`) | 18.x |
| **Vite 5** | Build tool & dev server | 5.x |
| **Leaflet.js** | Interactive map | 1.9.x |
| **react-leaflet** | React wrapper for Leaflet | 4.x |
| **react-router-dom** | Page routing | 6.x |

---

## ☕ Backend

| Technology | Purpose | Version |
|---|---|---|
| **Java** | Programming language | **21** (from your `pom.xml`) |
| **Spring Boot** | Backend framework | **3.3.4** (from your `pom.xml`) |
| **Spring Security** | Security layer | 3.x |
| **JWT (jjwt)** | Token authentication | **0.12.6** (from your `pom.xml`) |
| **Lombok** | Boilerplate reduction | 1.18.x |
| **Maven** | Build tool | 3.9 |

---

## 🗄️ Database

| Technology | Purpose | Detail |
|---|---|---|
| **MongoDB Atlas** | Primary database | Free M0 cluster |
| **GeoJsonPoint** | Geo-location storage | Already in your `Report.java` ✅ |
| **$near queries** | Nearby reports | Already in `ReportRepository.java` ✅ |

---

## 📸 Image Storage — Recommendation

### 🏆 **Cloudinary** (Already Referenced in Your Code!)

```
Your document says:
"Photo upload left as URL field +
 commented Cloudinary example (easy to enable)" ✅
```

**Just uncomment it! Here's the complete setup:**

```javascript
// frontend/src/pages/ReportPage.tsx
// Replace photo URL field with this:

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "civic_report_preset"); // unsigned

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  return data.secure_url; // Save this URL to MongoDB
};
```

```java
// backend — Report.java already has photo URL field
// Just store the Cloudinary URL string — no backend changes needed!
private String photoUrl; // Already exists ✅
```

**Setup (5 min):**
```
1. cloudinary.com → Free account
2. Settings → Upload Presets
3. Create preset: civic_report_preset
4. Mode: Unsigned ✅
5. Add to frontend .env:
   VITE_CLOUDINARY_NAME=your_cloud_name
```

---

## 🗺️ Maps / Geo

| Technology | Purpose | Cost |
|---|---|---|
| **Leaflet.js** | Map rendering | Free |
| **OpenStreetMap** | Map tiles | Free, no API key |
| **MongoDB GeoJsonPoint** | Location storage | Already set up ✅ |
| **Browser Geolocation API** | GPS picker | Free, built-in |

---

## 🔐 Auth

| Technology | Purpose | Detail |
|---|---|---|
| **JWT Bearer Token** | Auth method | Already in `JwtService.java` ✅ |
| **Spring Security** | Filter chain | Already in `SecurityConfig.java` ✅ |
| **BCrypt** | Password hashing | Already in `AuthService.java` ✅ |
| **Roles** | CITIZEN / AUTHORITY | Already seeded via `DataSeeder.java` ✅ |

---

## 🚀 Hosting

| Layer | Platform | Cost | Why |
|---|---|---|---|
| **Frontend** | **Vercel** | Free | Auto-deploy from GitHub, Vite optimized |
| **Backend** | **Render (Docker)** | Free | Java 21 via Dockerfile |
| **Database** | **MongoDB Atlas** | Free M0 | Already cloud-hosted |
| **Images** | **Cloudinary CDN** | Free 25GB | Already referenced in code |
| **Uptime** | **UptimeRobot** | Free | Keeps Render awake |

---

## 📋 Full Stack Summary

```
┌─────────────────────────────────────────────────┐
│           CIVIC REPORT — FULL TECH STACK        │
├─────────────────┬───────────────────────────────┤
│ HTML/CSS/JS     │ Base Frontend                 │
│ Tailwind CSS    │ Styling                       │
│ React 18 + TS   │ UI Framework                  │
│ Vite 5          │ Build Tool                    │
│ Leaflet.js      │ Maps                          │
│ OpenStreetMap   │ Free Map Tiles                │
├─────────────────┼───────────────────────────────┤
│ Java 21         │ Backend Language              │
│ Spring Boot 3.3.4│ Backend Framework            │
│ JWT 0.12.6      │ Authentication                │
│ Spring Security │ Authorization                 │
│ Lombok          │ Code Generation               │
│ Maven 3.9       │ Build Tool                    │
├─────────────────┼───────────────────────────────┤
│ MongoDB Atlas   │ Database (Free M0)            │
│ GeoJsonPoint    │ Geo Storage                   │
├─────────────────┼───────────────────────────────┤
│ Cloudinary ⭐   │ Image Storage (Free 25GB)     │
├─────────────────┼───────────────────────────────┤
│ Docker          │ Backend Container             │
│ Vercel          │ Frontend Hosting              │
│ Render          │ Backend Hosting               │
│ UptimeRobot     │ Keep Render Awake             │
│ GitHub          │ Version Control               │
└─────────────────┴───────────────────────────────┘
```

---

## ✅ What's Already Done in Your Code

```
✅ JWT Auth (JwtService.java + JwtAuthFilter.java)
✅ MongoDB GeoJsonPoint (Report.java)
✅ Nearby reports ($near query in ReportRepository.java)
✅ Role-based access (CITIZEN / AUTHORITY)
✅ Authority seeding (DataSeeder.java)
✅ Vite proxy config (no CORS in dev)
✅ Leaflet map (HomePage.tsx)
✅ Cloudinary URL field (just uncomment!)
✅ Full CRUD API (ReportController.java)


