/**
 * WhatsApp & SMS Message Template Service
 */
function generateRetailerIntakeConfirm(req) {
  let text = `🛒 *B2B Procurement Request Received!*\n`;
  text += `----------------------------------------\n`;
  text += `*Req ID:* \`${req.requirement_id}\` \n`;
  text += `*Merchant:* ${req.merchant_name} (${req.merchant_type})\n`;
  text += `*Location:* ${req.location}\n\n`;
  text += `📦 *Items Requested:*\n`;
  req.items.forEach(it => {
    text += `  • *${it.item_name}*: ${it.quantity} ${it.unit}\n`;
  });
  text += `\n⚡ *Urgency Level:* ${req.urgency_tier}\n`;
  text += `🔍 *Status:* Live Bidding & Landed Cost Optimization in Progress...\n`;
  text += `----------------------------------------`;
  return text;
}

module.exports = { generateRetailerIntakeConfirm };
