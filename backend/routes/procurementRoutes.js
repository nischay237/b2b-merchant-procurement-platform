const express = require('express');
const router = express.Router();
const procurementController = require('../controllers/procurementController');

// GET /api/procurement/suppliers - List registered wholesale suppliers & catalogs
router.get('/suppliers', procurementController.getSuppliers);

// POST /api/procurement/intake - Process retailer intake and execute landed cost matchmaking
router.post('/intake', procurementController.processIntake);

// POST /api/procurement/whatsapp-preview - Generate WhatsApp RFQ dispatch message
router.post('/whatsapp-preview', procurementController.generateWhatsAppPreview);

module.exports = router;
