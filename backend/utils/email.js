const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Email templates
const templates = {
  'verify-email': {
    subject: 'Verify your email address',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to StartupConnect, ${data.name}!</h2>
        <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.verificationUrl}" style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
        </div>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${data.verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>The StartupConnect Team</p>
      </div>
    `
  },
  'reset-password': {
    subject: 'Reset your password',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hi ${data.name},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.resetUrl}" style="background-color: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>This link will expire in 10 minutes.</p>
        <p>Best regards,<br>The StartupConnect Team</p>
      </div>
    `
  },
  'connection-request': {
    subject: 'New connection request',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Connection Request</h2>
        <p>Hi ${data.recipientName},</p>
        <p>${data.senderName} wants to connect with you on StartupConnect.</p>
        ${data.message ? `<p>Message: ${data.message}</p>` : ''}
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.acceptUrl}" style="background-color: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">Accept</a>
          <a href="${data.rejectUrl}" style="background-color: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reject</a>
        </div>
        <p>Best regards,<br>The StartupConnect Team</p>
      </div>
    `
  },
  'new-message': {
    subject: 'You have a new message',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Message from ${data.senderName}</h2>
        <p>Hi ${data.recipientName},</p>
        <p>You have a new message:</p>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;">${data.message}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.messageUrl}" style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">View Message</a>
        </div>
        <p>Best regards,<br>The StartupConnect Team</p>
      </div>
    `
  }
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const template = templates[options.template];
    if (!template) {
      throw new Error(`Template '${options.template}' not found`);
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.email,
      subject: options.subject || template.subject,
      html: template.html(options.data)
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
  return await sendEmail({
    email: user.email,
    template: 'verify-email',
    data: {
      name: user.name,
      verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${user.emailVerificationToken}`
    }
  });
};

// Send password reset email
const sendPasswordResetEmail = async (user, token) => {
  return await sendEmail({
    email: user.email,
    template: 'reset-password',
    data: {
      name: user.name,
      resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${token}`
    }
  });
};

// Send connection request email
const sendConnectionRequestEmail = async (sender, recipient, connectionId, message) => {
  return await sendEmail({
    email: recipient.email,
    template: 'connection-request',
    data: {
      recipientName: recipient.name,
      senderName: sender.name,
      message: message,
      acceptUrl: `${process.env.FRONTEND_URL}/connections/accept/${connectionId}`,
      rejectUrl: `${process.env.FRONTEND_URL}/connections/reject/${connectionId}`
    }
  });
};

// Send new message notification email
const sendNewMessageEmail = async (sender, recipient, message, messageId) => {
  return await sendEmail({
    email: recipient.email,
    template: 'new-message',
    data: {
      recipientName: recipient.name,
      senderName: sender.name,
      message: message,
      messageUrl: `${process.env.FRONTEND_URL}/messages/${messageId}`
    }
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendConnectionRequestEmail,
  sendNewMessageEmail
};