import { Users } from "../models/user.js";
import { databaseContext } from "../models/databaseContext.js";
import passport from "passport";

class UserService {

    async selectOneById(id) {
        const result = await Users.findByPk(id)
        return result;
    }
    

    async selectOneByRecoveryHash(recovery_hash) {
        const result = await Users.findOne({
            where: { recovery_hash }
        })

        return result;
    }

    async selectOneByEmail(email) {
        const result = await Users.findOne({
            where: { email}
        })

        return result;
    }
    
    async list() {
        const result = await Users.findAll();
        return result;
    }

    async save(body) {

        let admin = null;

        if (body.admin == null || body.admin == 0) {
            admin = 0;

        } else if (body.admin == 1) {
            admin = 1;
        }

        const result = await Users.create({
            name_and_surname: body.name_and_surname,
            email: body.email,
            password: databaseContext.literal(`AES_ENCRYPT('${body.password}','${process.env.USER_PASSWORD_KEY}')`),
            admin: admin,
            verified : 0
        });
        
        return result;
    }

    async delete(id) {
        await Users.destroy({
            where : { id }
        });
    }

    login(req, res, next) {
        passport.authenticate("local", { 
            successRedirect: "/",
            failureRedirect: "/user/login",
            failureFlash: true
        })(req, res, next)
    }

    logout(req, res) {
        req.logout();
        req.flash("success_msg", "Você foi desconectado com sucesso");
    }

    async setRecoveryHash(id, recovery_hash) {
        await Users.update(
            {
                in_recovery : 1,
                recovery_hash
            },
            {
                where : { id }
            }
        )
    }

    async verifyAccount(id) {
        await Users.update(
            {
                verified : 1
            },
            {
                where : { id }
            }
        )
    }

    async updatePassword(password, recovery_hash) {
        await Users.update(
            {
                password : databaseContext.literal(`AES_ENCRYPT('${password}','${process.env.USER_PASSWORD_KEY}')`),
                in_recovery : 0
            },
            {
                where : { recovery_hash }
            }
        )
    }
}

export { UserService }