# 🛒 B2B Wholesale Mandi - Direct Merchant Procurement & Vendor Matchmaking Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN%20(MongoDB%20%7C%20Express%20%7C%20React%20%7C%20Node)-blue?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20v24-brightgreen?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Express MVC](https://img.shields.io/badge/Architecture-Express%20MVC-black?style=for-the-badge&logo=express)](https://expressjs.com)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

> An algorithmic B2B wholesale procurement and vendor matchmaking platform designed for retail shopkeepers (Kirana stores, garments, electronics, hardware) to source wholesale raw materials at the lowest landed cost with fast delivery timelines.

---

## 🎯 Executive Summary & Value Proposition

In traditional wholesale supply chains, retail merchants face opaque landed costs, fragmented distributor networks, and unpredictable delivery timelines. This platform automates merchant intake, evaluates candidate manufacturers, and calculates itemized **Landed Costs** in under 50ms using a normalized multi-objective optimization algorithm.

### **Core Innovation: Tri-Objective Recommendation System**
- 🟢 **Sabse Sasta (Cheapest)**: Minimizes final landed cost $C_{\text{landed}}$.
- ⚡ **Sabse Tez (Fastest)**: Minimizes delivery ETA $\text{ETA}_{\text{hours}}$.
- ⭐ **Top Rated (Best Value)**: Maximizes normalized composite weighted score ($0.45 \times \text{CostScore} + 0.35 \times \text{TimeScore} + 0.20 \times \text{Reliability}$).

---

## 🏗️ System Architecture & Directory Structure

```text
merchant_procurement_platform/
├── backend/                              # Express MVC REST API Server (Port 5000)
│   ├── server.js                         # Express Server & MongoDB Connection
│   ├── package.json                      # Node.js dependencies (express, cors, mongoose, dotenv)
│   ├── .env                              # Environment variables & MongoDB Atlas URI
│   ├── routes/
│   │   └── procurementRoutes.js          # Express Router (/api/procurement)
│   ├── controllers/
│   │   └── procurementController.js      # Controller methods (getSuppliers, processIntake)
│   ├── models/
│   │   └── Supplier.js                   # Mongoose MongoDB Schema & Model
│   └── services/
│       ├── matchmakingService.js         # JavaScript Landed Cost Optimization Engine
│       └── templateService.js            # WhatsApp Message Template Service
├── frontend/                             # React Web App Server (Port 8080)
│   ├── server.js                         # Node.js Static File Web Server
│   └── package.json
├── index.html                            # React.js & Tailwind CSS Frontend Application
├── .gitignore                            # Excludes node_modules, secrets, and temp logs
└── README.md                             # Project Documentation
```

---
