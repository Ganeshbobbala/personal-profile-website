const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'contacts.json');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Ensure data directory and file exist
const ensureDataStore = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
};

ensureDataStore();

// Setup Email Transporter
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('WARNING: SMTP credentials not set in .env. Emails will not be sent, but submissions are still saved to contacts.json.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587/other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// GET Contacts (simple utility, can be used to view submissions)
app.get('/api/contact', (req, res) => {
  try {
    ensureDataStore();
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const contacts = JSON.parse(data);
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    res.status(500).json({ error: 'Failed to retrieve messages.' });
  }
});

// POST Contact Form Submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    ensureDataStore();
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const contacts = JSON.parse(data);

    const contactSubject = subject || 'Website Profile Contact';

    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      subject: contactSubject,
      message,
      createdAt: new Date().toISOString()
    };

    contacts.push(newContact);
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));

    console.log(`New contact message received from ${name} (${email})`);

    // Attempt to dispatch email notification
    const transporter = createTransporter();
    if (transporter) {
      const receiverEmail = process.env.RECEIVER_EMAIL || process.env.SMTP_USER;
      const mailOptions = {
        from: `"Ganesh Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: receiverEmail,
        subject: `[Portfolio Contact]: ${contactSubject}`,
        text: `You received a new message from Ganesh's Profile Website:
        
Name: ${name}
Email: ${email}
Subject: ${contactSubject}

Message:
${message}

Sent at: ${new Date().toLocaleString()}`,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5; color: #1e293b;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${contactSubject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: none; border-top: 1px solid #cbd5e1; margin-top: 30px;" />
          <p style="font-size: 0.85em; color: #64748b;">Sent from Ganesh Bobbala's Personal Profile Website.</p>
        </div>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', info.messageId);
        }
      });
    }

    res.status(201).json({
      message: 'Thank you! Your message has been received successfully.',
      contact: { id: newContact.id, name: newContact.name }
    });
  } catch (error) {
    console.error('Error writing contact message:', error);
    res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
