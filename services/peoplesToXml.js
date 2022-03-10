import { Peoples } from "../models/people.js";
import xml from "xml";
async function peoplesToXml(req, res) {
    let result = [];
    let resultXml = '<?xml version="1.0" encoding="UTF-8"?> <peoples>';
    const peoples = await Peoples.findAll();
    res.set("Content-Type", "text/xml")

    peoples.forEach(function(people) {
        result.push(people.dataValues)
    })

    result.forEach(function(data) {
        resultXml+= 
            `<people>
                <id>${data.id}</id>
                <name>${data.name}</name>
                <surname>${data.surname}</surname>
                <genre>${data.genre}</genre>
                <nameInHebrew>${data.name_in_hebrew}</nameInHebrew>
                <nameOfFatherInHebrew>${data.name_of_father_in_hebrew}</nameOfFatherInHebrew>
                <nameOfMotherInHebrew>${data.name_of_mother_in_hebrew}</nameOfMotherInHebrew>
                <nameOfGrandmother>${data.name_of_grandmother}</nameOfGrandmother>
                <dateOfBorn>${data.date_of_born}</dateOfBorn>
                <timeCourseOfBorn>${data.time_course_of_born}</timeCourseOfBorn>
                <numberOfCellphone>${data.number_of_cellphone}</numberOfCellphone>
                <email>${data.email}</email>
                <zipCode>${data.zip_code}</zipCode>
                <publicPlace>${data.public_place}</publicPlace>
                <numberOfPlace>${data.number_of_place}</numberOfPlace>
                <district>${data.district}</district>
                <city>${data.city}</city>
                <state>${data.state}</state>
                <complementOfAdress>${data.complement_of_adress}</complementOfAdress>
                <comments>${data.comments}</comments>
            </people>`
    })

    resultXml+="</peoples>"

    console.log(resultXml)

    return res.status(200).send(resultXml)
}


export { peoplesToXml }