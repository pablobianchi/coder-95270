import nodemailer from 'nodemailer';
import {env} from './env.js';


// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD
  },
});