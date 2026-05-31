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
      { name: "Mustard Oil", category: "KIRANA", unitPrice: 128.0, availableQty: 8000, unit: "Liters" },
      { name: "Refined Soyabean Oil", category: "KIRANA", unitPrice: 115.0, availableQty: 10000, unit: "Liters" }
    ],
    reviews: [
      { reviewer: "Ramesh Sharma", shop: "Sharma Kirana Store", location: "Kanpur", rating: 5, date: "18 Aug 2026", comment: "Fast 3-hour express delivery!" }
    ]
  },
  {
    id: "SUP-KNP-01",
    name: "Kanpur Central Wholesale Mandi",
    type: "Wholesaler",
    location: "Nayaganj, Kanpur, UP",
    phone: "+91 98765 4321",
    whatsapp: "91987654321",
    coords: [26.4600, 80.3400],
    rating: 4.6,
    accuracy: 0.96,
    leadTimeHours: 1.5,
    catalog: [
      { name: "Wheat Flour (Aata)", category: "KIRANA", unitPrice: 32.0, availableQty: 5000, unit: "kg" },
      { name: "Mustard Oil", category: "KIRANA", unitPrice: 140.0, availableQty: 2000, unit: "Liters" },
      { name: "Basmati Rice", category: "KIRANA", unitPrice: 65.0, availableQty: 3000, unit: "kg" },
      { name: "Sugar (Chini)", category: "KIRANA", unitPrice: 38.0, availableQty: 4000, unit: "kg" }
    ],
    reviews: [
      { reviewer: "Deepak Agarwal", shop: "Agarwal General Store", location: "Kanpur", rating: 5, date: "20 Aug 2026", comment: "Super fast 1.5 hour delivery in Kanpur!" }
    ]
  }
];

module.exports = {
  SupplierModel,
  getAllSuppliers: async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        const suppliers = await SupplierModel.find({});
        if (suppliers.length > 0) return suppliers;
      }
    } catch (err) {
      console.log("Using seed data fallback for MongoDB query");
    }
    return SEED_SUPPLIERS;
  },
  getSupplierById: async (id) => {
    try {
      if (mongoose.connection.readyState === 1) {
        const supplier = await SupplierModel.findOne({ id });
        if (supplier) return supplier;
      }
    } catch (err) {}
    return SEED_SUPPLIERS.find(s => s.id === id);
  }
};
