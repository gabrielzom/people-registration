import { Peoples } from "../models/people.js";
import { config } from "dotenv";
config();

class PeoplesToJsonService {

    async execute(req, res) {

        if (req.headers.authorization != process.env.AUTHORIZATION_TOKEN) {
            return res.status(401).render("unauthorized");

        } else {
            let result = [];
            const peoples = await Peoples.findAll();
            
            peoples.forEach(function(people) {
                result.push(people.dataValues);
            })

            res.set("Content-Type", "text/json");
    
            return res.status(200).send(result);
        }
         
    }
   
}

export { PeoplesToJsonService }