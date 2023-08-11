import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: import.meta.env.GMAIL_USER_NAME,
        pass: import.meta.env.GMAIL_APP_PASSWORD
    }
});

export default transporter;