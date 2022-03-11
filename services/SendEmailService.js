import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

class SendEmailService {

    transporter;

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

    async sendEmailForVerifyNewAccount(email, idVerify) {

        idVerify  = Number(idVerify);
        idVerify *= Number(process.env.USER_PASSWORD_SEND_EMAIL)
        idVerify += Number(process.env.USER_PASSWORD_SEND_EMAIL)
        
        const response = await this.transporter.sendMail({
            
            from: "noreply@peopleregister.net",
            to: email,
            replyTo: process.env.SMTP_USER,
            subject: "Verifique sua conta no People Register",
            html: `<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify Your Acc</title>
            </head>
            <body>
                <a href="http://localhost:9090/user/verify/${idVerify}">Clique aqui para verificar seu e-mail</a>
            </body>
            </html>`
        })

        return response;

    }

    async recoveryPassword(email, idRecovery) {

        idRecovery  = Number(idRecovery);
        idRecovery *= Number(process.env.USER_PASSWORD_SEND_EMAIL)
        idRecovery += Number(process.env.USER_PASSWORD_SEND_EMAIL)

        const response = await this.transporter.sendMail({
            
            from: "noreply@peopleregister.net",
            to: email,
            replyTo: process.env.SMTP_USER,
            subject: "Alteração de senha People Register",
            html: `<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Recovery your pass</title>
            </head>
            <body>
                <a href="http://localhost:9090/user/recoverypassword/${idRecovery}">Clique aqui para alterar sua senha</a>
            </body>
            </html>`
        })

        return response;

    }


    async send(email, subject, text) {

        const response = await this.transporter.sendMail({
            
            from: "noreply@peopleregister.net",
            to: email,
            replyTo: process.env.SMTP_USER,
            subject,
            text
        })

        return response;
    }
}

export { SendEmailService }