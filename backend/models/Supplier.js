const mongoose = require('mongoose');

// Supplier Mongoose Schema
const supplierSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  coords: { type: [Number], required: true },
  rating: { type: Number, default: 4.5 },
  accuracy: { type: Number, default: 0.95 },
  leadTimeHours: { type: Number, default: 2.0 },
  catalog: [{
    name: String,
    category: String,
    unitPrice: Number,
    availableQty: Number,
    unit: String
  }],
  reviews: [{
    reviewer: String,
    shop: String,
    location: String,
    rating: Number,
    date: String,
    comment: String
  }]
}, { timestamps: true });

let SupplierModel;
try {
  SupplierModel = mongoose.model('Supplier');
} catch (e) {
  SupplierModel = mongoose.model('Supplier', supplierSchema);
}

// Fallback seed database if MongoDB is not connected
const SEED_SUPPLIERS = [
  {
    id: "SUP-UNN-02",
    name: "Unnao Agro & FMCG Processing Industries",
    type: "Manufacturer",
    location: "Industrial Area, Unnao, UP",
    phone: "+91 99999 9999",
    whatsapp: "91999999999",
    coords: [26.5393, 80.4878],
    rating: 4.8,
    accuracy: 0.98,
    leadTimeHours: 3.5,
    catalog: [
      { name: "Wheat Flour (Aata)", category: "KIRANA", unitPrice: 27.5, availableQty: 15000, unit: "kg" },
