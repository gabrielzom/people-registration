import { Peoples } from "../models/people.js";
import { config } from "dotenv";
config();

class PeoplesToJsonService {

    async execute(req, res) {
        let result = [];
        const peoples = await Peoples.findAll();

        peoples.forEach(function(people) {
            result.push(people.dataValues);
        })

        return res.status(200).send(result);
    }
   
}

export { PeoplesToJsonService }