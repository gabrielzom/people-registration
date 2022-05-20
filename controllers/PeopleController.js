import { PeopleService } from "../services/PeopleService.js";

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

    async exportPeoples(req, res) {
        const filename = await this.peopleService.export()
        res.type('text').download(`./temp/${filename}`)
    }

    async peoplesToJson(req, res) {
        return await this.peopleService.peoplesToJson(req, res)
    }
}
     
export { PeopleController }