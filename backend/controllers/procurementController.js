const supplierModel = require('../models/Supplier');
const { matchSuppliers } = require('../services/matchmakingService');
const { generateRetailerIntakeConfirm } = require('../services/templateService');

// GET /api/procurement/suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.getAllSuppliers();
    res.json({ success: true, count: suppliers.length, data: suppliers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/procurement/intake
exports.processIntake = async (req, res) => {
  try {
    const { merchant_name, merchant_type, location, coords, items, urgency_tier, target_budget } = req.body || {};

    const requirement = {
      requirement_id: `REQ-${Date.now().toString().slice(-6)}`,
      merchant_name: merchant_name || "Gupta Kirana Store",
      merchant_type: merchant_type || "Kirana / Grocery Shop Owner",
      location: location || "Kidwai Nagar, Kanpur, UP",
      coords: coords || [26.4499, 80.3319],
      items: items || [
        { item_name: "Wheat Flour (Aata)", quantity: 500, unit: "kg" },
        { item_name: "Mustard Oil", quantity: 200, unit: "Liters" }
      ],
      urgency_tier: urgency_tier || "IMMEDIATE_24H",
      target_budget: target_budget || 45000
    };

