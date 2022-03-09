import { PeopleService } from "../services/PeopleService.js";
import express from "express";
class PeopleController {

    peopleService = new PeopleService();

    async renderPeoplesList(req, res) {
        const peoples = await this.peopleService.list();
        res.render("./people/list", { peoples : peoples })
    }

    renderRegister(req, res) {
        res.render("./people/register")
    }

    registerPeople(req, res) {
        this.peopleService.save(req.body)
        res.render("./people/success-register")
    }

    exportPeoples() {
        this.peopleService.export()
    }
}
     
export { PeopleController }