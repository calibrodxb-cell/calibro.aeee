import nodemailer from 'nodemailer';

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 60;
const MAX_MESSAGE = 5000;

function clean(value = '', max = 1000) {
  return String(value).replace(/\u0000/g, '').trim().slice(0, max);
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#039;',
    '"': '&quot;'
  }[char]));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Honeypot: bots commonly fill invisible inputs. Return a normal success
    // response so the field does not become a useful signal for spammers.
    if (clean(data.website, 200)) {
      return Response.json({ success: true });
    }

    const name = clean(data.name, MAX_NAME);
    const email = clean(data.email, MAX_EMAIL);
    const phone = clean(data.phone, MAX_PHONE);
    const message = clean(data.message, MAX_MESSAGE);
    const source = clean(data.source, 500);

    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: 'Please complete the required fields.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing SMTP environment variables.');
      return Response.json(
        {
          success: false,
          message: 'The enquiry service is temporarily unavailable. Please contact us by WhatsApp or phone.'
        },
        { status: 503 }
      );
    }

    const port = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Calibro Website" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || 'team@calibro.ae',
      replyTo: email,
      subject: `New Calibro website enquiry - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSource: ${source || 'Website'}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#222"><h2>New Calibro website enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p><p><strong>Source:</strong> ${escapeHtml(source || 'Website')}</p><p><strong>Project brief:</strong></p><div style="padding:14px;background:#f5f5f5">${escapeHtml(message).replace(/\n/g, '<br>')}</div></div>`
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('CONTACT FORM ERROR:', error);
    return Response.json(
      {
        success: false,
        message: 'Unable to send your enquiry. Please contact us by WhatsApp or phone.'
      },
      { status: 500 }
    );
  }
}
