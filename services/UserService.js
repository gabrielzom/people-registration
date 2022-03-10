import { Users } from "../models/user.js";

class UserService {
    
    async list() {
        const result = await Users.findAll();
        return result;
    }

    async save(body) {
        await Users.create(body);
    }

    async delete(id) {
        await Users.destroy({
            where : { id }
        });
    }
}

export { UserService }