import express from "express";
import { Router } from "express";
import { PeopleController } from "../controllers/PeopleController.js";
import { UserService } from "../services/UserService.js";
import { accessLevel } from "../helpers/accessLevel.js";
import { download } from "../services/DownloadService.js"
import nodemailer from "nodemailer";
import { config } from "dotenv";
import { Users } from "../models/user.js";
import { databaseContext } from "../models/databaseContext.js";
import { peoplesToJson } from "../services/peoplesToJson.js"
config();

const people = Router();

people.use(express.static("static"))

const peopleController = new PeopleController()
const userService = new UserService()

people.get("/logout", accessLevel.isOperator, (req, res) => {
    req.logout();
    req.flash("success_msg", "Você foi desconectado com sucesso");
    res.redirect("/")
})

people.get("/users", accessLevel.isAdmin, async (req, res) => {
    const users = await userService.list();
    return res.render("./user/register", { users })
})

people.get("/users/delete/:id", accessLevel.isAdmin, async (req, res) => {
    if (req.params.id == req.user.id) {
        const users = await userService.list();
        res.render("./user/register", { 
            users,
            error_msg : "Não é possível deletar o usuário que está autenticado."
        })

    } else {
        await userService.delete(req.params.id);
        return res.redirect("/users");
    }
    
})

people.post("/users/signup", accessLevel.isAdmin, async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    transporter
        .sendMail({
            from: "noreply@peopleregister.net",
            to: req.body.email,
            replyTo: process.env.SMTP_USER,
            subject: "VALID EMAIL VERIFY",
            text: "ESTE EMAIL É AUTOMÁTICO, PARA VERIFICAR SE A CONTA É VÁLIDA"
        })
        .then(() => {
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(async (result) => {
                if (result) {
                    const users = await userService.list()
                    res.render("./user/register", { 
                        users,
                        error_msg: "Este endereço de e-mail já está sendo usado." 
                    })

                } else {
                    Users.create({
                        name_and_surname: req.body.name_and_surname,
                        email: req.body.email,
                        password: databaseContext.literal(`AES_ENCRYPT("${req.body.password}","${process.env.USER_PASSWORD_KEY}")`),
                        admin: req.body.admin
                    })
                    .then(async () => {
                        const users = await userService.list()
                        return res.render("./user/register", {
                            users,
                            success_msg: "Usuário incluído com sucesso." 
                        })
                    })
                    .catch(error => console.log("-- incorrect insert usuario: " + error))
                }
            })
            
        })
        .catch(async () => {
            const users = await userService.list();
            return res.render("./user/register", {
                users,
                error_msg: "Este endereço de e-mail não é válido."
            })
        })
})

people.get("/exportallpeoples", peoplesToJson)
people.get("/", (req, res) => peopleController.renderRegister(req, res))
people.get("/list", accessLevel.isOperator, (req, res) => peopleController.renderPeoplesList(req, res))
people.get("/export-peoples", accessLevel.isAdmin, download)
people.post("/register-people", (req, res) => peopleController.registerPeople(req, res))


export { people } 