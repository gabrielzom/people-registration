import express from "express";
import { Router } from "express";
import { PeopleController } from "../controllers/PeopleController.js";;

const people = Router();

people.use(express.static("public"))

const peopleController = new PeopleController()

people.get("/", (req, res) => peopleController.renderRegister(req, res))
people.get("/list", (req, res) => peopleController.renderPeoplesList(req, res))
people.get("/export-peoples", (req, res) => peopleController.exportPeoples(req, res))
people.post("/register-people", (req, res) => peopleController.registerPeople(req, res))

export { people } 