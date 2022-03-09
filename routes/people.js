import express from "express";
import { Router } from "express";
import { PeopleController } from "../controllers/PeopleController.js";
import { accessLevel } from "../helpers/accessLevel.js";
import { download } from "../services/DownloadService.js"

const people = Router();

people.use(express.static("static"))

const peopleController = new PeopleController()

people.get("/logout", accessLevel.isAdmin, (req, res) => {
    req.logout();
    req.flash("success_msg", "Você foi desconectado com sucesso");
    res.redirect("/")
})

people.get
people.get("/", (req, res) => peopleController.renderRegister(req, res))
people.get("/list", accessLevel.isAdmin, (req, res) => peopleController.renderPeoplesList(req, res))
people.get("/export-peoples", accessLevel.isAdmin, download)
people.post("/register-people", (req, res) => peopleController.registerPeople(req, res))

export { people } 