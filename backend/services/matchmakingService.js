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
        const subtotal = stock.unitPrice * reqItem.quantity;
        baseItemCost += subtotal;
        breakdown.push({
          item_name: reqItem.item_name,
          quantity: reqItem.quantity,
          unit: reqItem.unit,
          unitPrice: stock.unitPrice,
          subtotal
        });
      }
    });

    if (canFulfill) {
      const dist = calcDistance(coords[0], coords[1], supp.coords[0], supp.coords[1]);
      const rawFreight = baseFreight + (freightRate * dist * totalWeight);
      const logisticsCost = Math.round(rawFreight * expressSurcharge * 100) / 100;
      const platformFee = Math.round(baseItemCost * 0.02 * 100) / 100;
      const tax = Math.round((baseItemCost + platformFee) * 0.05 * 100) / 100;
      const landedCost = Math.round((baseItemCost + logisticsCost + platformFee + tax) * 100) / 100;

      const etaHours = Math.round((supp.leadTimeHours + (dist / speedKmh)) * 10) / 10;
      const reliability = Math.round(((supp.rating / 5) * 40 + supp.accuracy * 40 + 20) * 10) / 10;

      quotes.push({
        quote_id: `QT-${supp.id}-${Math.round(landedCost)}`,
        supplier_id: supp.id,
        supplier_name: supp.name,
        supplier_type: supp.type,
        supplier_location: supp.location,
        distance_km: dist,
        items_breakdown: breakdown,
        total_base_item_cost: baseItemCost,
        logistics_cost: logisticsCost,
        platform_fee: platformFee,
        tax_amount: tax,
        landed_cost: landedCost,
        estimated_delivery_hours: etaHours,
        reliability_score: reliability
      });
    }
  });
