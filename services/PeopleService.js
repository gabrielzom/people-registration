import { Peoples } from "../models/people.js";

class PeopleService {
    
    async list() {
        const result = await Peoples.findAll();
        return result;
    }

    async save(body) {
        await Peoples.create(body);
    }

    export() {

    }
}

export { PeopleService }