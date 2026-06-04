/**
 * Node.js MERN Landed Cost & Multi-Objective Vendor Optimization Service
 */
function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.max(Math.round(R * c * 10) / 10, 5.0);
}

function matchSuppliers(merchantReq, registeredSuppliers) {
  const { coords, items, urgency_tier } = merchantReq;
  const totalWeight = items.reduce((sum, item) => sum + Number(item.quantity), 0);

  let freightRate = 0.04;
  let baseFreight = 350;
  let speedKmh = 45;
  let expressSurcharge = 1.35;

  if (urgency_tier === "EXPRESS_48H") {
    freightRate = 0.025; baseFreight = 200; speedKmh = 50; expressSurcharge = 1.15;
  } else if (urgency_tier === "STANDARD_3_5D") {
    freightRate = 0.015; baseFreight = 100; speedKmh = 40; expressSurcharge = 1.0;
  }

  const quotes = [];

  registeredSuppliers.forEach(supp => {
    let canFulfill = true;
    let baseItemCost = 0;
    const breakdown = [];

    items.forEach(reqItem => {
      const stock = supp.catalog.find(c => c.name === reqItem.item_name);
      if (!stock || stock.availableQty < reqItem.quantity) {
        canFulfill = false;
      } else {
