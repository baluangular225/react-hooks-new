const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// SMTP configuration from env
const SMTP_HOST = process.env.SMTP_HOST || process.env.SMTP_SERVER;
const SMTP_PORT = process.env.SMTP_PORT || process.env.SMTP_SERVER_PORT;
const SMTP_USER = process.env.SMTP_USER || process.env.SMTP_USERNAME;
const SMTP_PASS = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER || process.env.FROM_ADDRESS;

let transporter = null;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587', 10),
    secure: String(SMTP_PORT) === '465',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
} else {
  console.warn('SMTP not configured — /api/email will log messages instead of sending');
}

// POST /api/email
// Supports two payload shapes:
// 1) { to, subject, text, html }
// 2) visit form: { from_name, visit_type, client_name, start_date, end_date, message }
// If recipient is not provided, uses NOTIFY_TO or FROM_EMAIL env var.
router.post('/email', async (req, res) => {
  const body = req.body || {};

  // Determine recipient
  const to = body.to || process.env.NOTIFY_TO || FROM_EMAIL;

  // If client provided raw subject/text/html use them
  let subject = body.subject;
  let text = body.text || '';
  let html = body.html || '';

  // If visit-form fields are present, build a notification email
  if (!subject && (body.from_name || body.visit_type || body.client_name)) {
    subject = `Visit request from ${body.from_name || 'unknown'}`;
    text = `Visit request details:\n\nName: ${body.from_name || ''}\nVisit type: ${body.visit_type || ''}\nClient: ${body.client_name || ''}\nStart: ${body.start_date || ''}\nEnd: ${body.end_date || ''}\n\nMessage:\n${body.message || ''}`;
    html = `<p><strong>Name:</strong> ${body.from_name || ''}</p>\n            <p><strong>Visit type:</strong> ${body.visit_type || ''}</p>\n            <p><strong>Client:</strong> ${body.client_name || ''}</p>\n            <p><strong>Start:</strong> ${body.start_date || ''}</p>\n            <p><strong>End:</strong> ${body.end_date || ''}</p>\n            <hr/>\n            <p>${(body.message || '').replace(/\n/g, '<br/>')}</p>`;
  }

  if (!to || !subject) return res.status(400).json({ error: 'Missing required fields: to or subject' });

  try {
    if (!transporter) {
      console.log('Simulated email:', { from: FROM_EMAIL, to, subject, text, html });
      return res.json({ ok: true, simulated: true });
    }

    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject,
      text,
      html
    });

    return res.json({ ok: true, info });
  } catch (err) {
    console.error('Send email failed', err);
    return res.status(500).json({ ok: false, error: err.message || 'send failed' });
  }
});

module.exports = router;
