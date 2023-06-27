import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

class SendEmailService {
    transporter

    constructor() {
         this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
    }

    async sendEmailForVerifyNewAccount(email, verify_uuid) {
        return await this.transporter.sendMail({
            from: 'noreply@peopleregister.net',
            to: email,
            replyTo: process.env.SMTP_USER,
            subject: 'Verifique sua conta no People Register',
            html: `<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify Your Acc</title>
            </head>
            <body>
                <a href="${process.env.HOST}/user/verify/${verify_uuid}">Clique aqui para verificar seu e-mail</a>
            </body>
            </html>`
        })
    }

    async recoveryPassword(email, recovery_uuid) {
        return await this.transporter.sendMail({
            from: 'noreply@peopleregister.net',
            to: email,
            replyTo: process.env.SMTP_USER,
            subject: 'Alteração de senha People Register',
            html: `<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Recovery your pass</title>
            </head>
            <body>
                <h2>Este link expira em 20 minutos</h2>
                <a href="${process.env.HOST}/user/recoverypassword/${recovery_uuid}">Clique aqui para alterar sua senha</a>
            </body>
            </html>`
        })
    }

    async send(email, subject, text) {
        return await this.transporter.sendMail({
            from: 'noreply@peopleregister.net',
            to: email,
            replyTo: process.env.SMTP_USER,
            subject,
            text,
        })
    }

}

export { SendEmailService }