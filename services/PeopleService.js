import { Peoples } from "../models/people.js";
import fs from "fs"

class PeopleService {
    
    async list() {
        const result = await Peoples.findAll();
        return result;
    }

    async save(body) {
        await Peoples.create(body);
    }

    async export() {

        let date = new Date()
        let month = "";
        let day = "";
        let text = "";

        const result = await Peoples.findAll();

        date.getMonth() < 10 ? month = "0" + (date.getMonth() + 1).toString() : month = (date.getMonth() + 1).toString();
        date.getDate() < 10 ? day = "0" + (date.getDate()).toString() : day = (date.getDate()).toString();
        date = `${date.getFullYear()}-${month}-${day}`

        result.forEach(row => {
            text += `${(row.dataValues.name_in_hebrew).toUpperCase()};${row.dataValues.date_of_born};${(row.dataValues.email).toUpperCase()};${date}\n`
        })

        let fileName = `${date}.txt`;

        fs.writeFileSync('./temp/' + fileName, text, 'utf-8', (error) => {
            if (error) {
                throw error;
            } else {
                console.log("-- complete write on temp");
            }
        })

        return fileName;
    }
}

export { PeopleService }