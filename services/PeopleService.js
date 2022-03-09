import { Peoples } from "../models/people.js";

class PeopleService {
    
    async list() {
        const result = await Peoples.findAll();
        console.log(result);
        return result;
    }

    async save(body) {
        await Peoples.create(body);
    }

    export() {

    }
}

export { PeopleService }