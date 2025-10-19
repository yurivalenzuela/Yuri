// /api/place-order.js
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data, items, subtotal, total } = req.body;

    if (!data?.firstName || !data?.email || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const itemsHtml = items
      .map(
        (it) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">${it.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">Qty: ${it.qty}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">${it.price}</td>
        </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; line-height:1.4">
        <h2 style="margin:0 0 10px">New Order — Faith & Flour</h2>
        <p><strong>Customer:</strong> ${data.firstName || ""} ${data.lastName || ""}</p>
        <p><strong>Email:</strong> ${data.email}<br/>
           <strong>Phone:</strong> ${data.phone || ""}</p>
        <p><strong>Address:</strong><br/>
           ${data.address || ""}<br/>
           ${data.city || ""}, ${data.region || ""} ${data.zip || ""}</p>

        <h3 style="margin:18px 0 8px">Items</h3>
        <table style="border-collapse:collapse; width:100%; max-width:640px">
          <tbody>
            ${itemsHtml}
            <tr>
              <td></td>
              <td style="padding:8px 12px; text-align:right"><strong>Subtotal</strong></td>
              <td style="padding:8px 12px; text-align:right"><strong>₱${Number(subtotal).toLocaleString()}</strong></td>
            </tr>
            <tr>
              <td></td>
              <td style="padding:8px 12px; text-align:right"><strong>Total</strong></td>
              <td style="padding:8px 12px; text-align:right"><strong>₱${Number(total).toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>

        ${data.payment ? `<p><strong>Payment:</strong> ${data.payment}</p>` : ""}
        ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
      </div>
    `;

    const to = process.env.ORDER_EMAIL_TO;
    if (!to) throw new Error("ORDER_EMAIL_TO env var is missing");

    const subject = `New order from ${data.firstName || ""} ${data.lastName || ""} — ₱${Number(total).toLocaleString()}`;

    await resend.emails.send({
      from: "Faith & Flour <orders@resend.dev>", // later: use your verified domain
      to,
      subject,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
