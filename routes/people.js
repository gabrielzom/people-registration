import express from "express";
import { Router } from "express";
import { PeopleController } from "../controllers/PeopleController.js";
import { accessLevel } from "../helpers/accessLevel.js";
import { config } from "dotenv";
import { PeoplesToJsonService } from "../services/PeoplesToJsonService.js"
config();

const people = Router();
people.use(express.static("static"))

const peopleController = new PeopleController()
const peoplesToJsonService = new PeoplesToJsonService()

people.get("/", (req, res) => 
    peopleController.renderRegister(req, res)
)

people.get("/list", accessLevel.isOperator, (req, res) => 
    peopleController.renderPeoplesList(req, res)
)

people.post("/register-people", (req, res) => 
    peopleController.registerPeople(req, res)
)

people.get("/exportallpeoples", (req, res) => 
    peoplesToJsonService.execute(req, res)
)

people.get("/export-peoples", accessLevel.isAdmin, (req, res) => 
    peopleController.exportPeoples(req, res)
)

export { people } 