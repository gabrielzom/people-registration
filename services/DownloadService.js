import fs from "fs";
import { Peoples } from "../models/people.js";

const download = async (req, res) => {
    let date = new Date()
    let month = "";
    let day = "";
    let text = "";

    const result = await Peoples.findAll();

    date.getMonth() < 10 ? month = "0" + (date.getMonth() + 1).toString() : month = (date.getMonth() + 1).toString();
    date.getDate() < 10 ?  day = "0" + (date.getDate()).toString() : day = (date.getDate()).toString();
    date = `${date.getFullYear()}-${month}-${day}`
    
    result.forEach(row => {
        text+=`${(row.dataValues.name_in_hebrew).toUpperCase()};${(row.dataValues.date_of_born).toISOString().split('T')[0]};${(row.dataValues.email).toUpperCase()};${date}\n`
    })

    let fileName = `${date}.txt`;

    fs.writeFileSync('./temp/'+fileName, text, 'utf-8', (error) => {
        if (error) {
            throw error;
        } else {
            console.log("-- complete write on history");
        }
    })
    
    res.type('text').download(`./temp/${fileName}`)
} 

export { download }