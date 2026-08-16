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

## 📐 Mathematical Formulation

### 1. Landed Cost Equation
$$C_{\text{landed}} = P_{\text{base}} \cdot Q + C_{\text{freight}} + F_{\text{platform}} + T_{\text{tax}}$$

Where:
- $P_{\text{base}} \cdot Q = \sum_{i=1}^{n} (p_i \cdot q_i)$ (Total Base Item Wholesale Price)
- $C_{\text{freight}} = \left[ F_{\text{base}} + (\alpha \cdot d_{\text{haversine}} \cdot W_{\text{total}}) \right] \cdot \beta_{\text{urgency}}$
- $F_{\text{platform}} = 0.02 \cdot (P_{\text{base}} \cdot Q)$ (Platform Facilitation Fee)
- $T_{\text{tax}} = 0.05 \cdot (P_{\text{base}} \cdot Q + F_{\text{platform}})$ (GST Tax 5%)

### 2. Haversine Distance Calculation
$$d = 2R \cdot \arcsin\left( \sqrt{\sin^2\left(\frac{\Delta\phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta\lambda}{2}\right)} \right)$$

### 3. Supplier Reliability Score
$$S_{\text{reliability}} = 0.40 \cdot \left(\frac{\text{Rating}}{5.0} \times 100\right) + 0.40 \cdot (\text{Accuracy} \times 100) + 0.20 \cdot (\text{StockAvailability} \times 100)$$

---

## 🌟 Key Features

1. **Multi-Category Wholesale Catalog**:
   Supports Kirana (Aata, Rice, Oil, Sugar), Sabun & Hygiene (Bath soaps, Surf Excel), Apparel & Garments (Surat Sarees, T-Shirts, Jeans), Electronics (Fast Chargers, LED Bulbs), Hardware & Plumbing (PVC Pipes, Taps), and Stationery.

2. **Merchant KYC Profile & Complete Store Address**:
   Captures shopkeeper full street address, house/shop no., landmark, city, state, pincode, GSTIN/license, 9-digit safe contact numbers (`+91 99999 9999`), and WhatsApp.

3. **Verified Dealer Customer Reviews**:
   4-5 pre-populated verified shopkeeper reviews per wholesaler with star ratings, dates, comments, and interactive review submission.

4. **Cart Drawer & Checkout System**:
   Shopping cart with itemized wholesale subtotal, freight calculation, 5% GST tax, and multiple payment methods (UPI, Cash on Delivery, Card).

5. **WhatsApp RFQ Generator**:
   Generates structured 1-click WhatsApp bidding templates for direct supplier communication.

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Sample Payload / Output |
|---|---|---|---|
| `GET` | `/health` | Server & MongoDB connection status | `{"status":"UP","mongodb_connected":true}` |
| `GET` | `/api/procurement/suppliers` | List all wholesale dealers & catalogs | Returns array of `Supplier` objects |
| `POST` | `/api/procurement/intake` | Execute landed cost optimization | Accepts items, coords, urgency $\rightarrow$ Returns Top 3 Quotes |
| `POST` | `/api/procurement/whatsapp-preview` | Generate WhatsApp RFQ text | Returns formatted Markdown message string |

---

## 💻 Quickstart & Running Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/YOUR_USERNAME/b2b-merchant-procurement-platform.git
cd b2b-merchant-procurement-platform

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables (`backend/.env`)
Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.mongodb.net/merchant_procurement_b2b?retryWrites=true&w=majority
NODE_ENV=development
```

### 3. Run Applications
```bash
# Terminal 1: Run Express REST API Server (Port 5000)
cd backend
node server.js

# Terminal 2: Run React Frontend Server (Port 8080)
cd frontend
node server.js
```

- **Frontend App**: [http://localhost:8080](http://localhost:8080)
- **Backend API**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 📄 License & Credits

Built with ❤️ by **Nischay** using the MERN Stack. Open source under the MIT License.
