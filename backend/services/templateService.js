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
