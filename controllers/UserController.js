import { UserService } from "../services/UserService.js";
import { SendEmailService } from "../services/SendEmailService.js";
import { config } from "dotenv";
config();

class UserController {

    userService = new UserService();
    sendEmailService = new SendEmailService();

    renderUserLogin(req, res) {
        res.render("./user/login")
    }

    userLogin(req, res, next) {
        this.userService.login(req, res, next)
    }

    userLogout(req, res) {
        this.userService.logout(req, res)
        res.redirect("/")
    }

    async renderUsersList(req, res, error_msg, success_msg) {
        const users = await this.userService.list();
        res.render("./user/list", { 
            users,
            error_msg,
            success_msg,    
        })
    }

    async registerUser(req, res) {

        const result = await this.userService.selectOne(req.body.email);

        if (result) {
            this.renderUsersList(req, res, "Este endereço de e-mail já está sendo usado. ", "");

        } else {
            const user = await this.userService.save(req.body);
            await this.sendEmailService.sendEmailForVerifyNewAccount(user.email, user.id);
            this.renderUsersList(req, res, "", "Usuário incluído com sucesso.");
        }
    }

    async deleteUser(req, res) {

        if (req.params.id == req.user.id) {
            this.renderUsersList(req, res, "Não é possível deletar um usuário autenticado. ", "")

        } else {
            await this.userService.delete(req.params.id);
            return res.redirect("/user/list");
        }
    }

    async verifyUser(req, res) {

        let idVerify = Number(req.params.id)
        idVerify -= Number(process.env.USER_PASSWORD_SEND_EMAIL);
        idVerify /= Number(process.env.USER_PASSWORD_SEND_EMAIL);

        await this.userService.verifyAccount(idVerify);

        return res.render("./user/verified");
    }

    renderForgotPassword(req, res, error) {
        res.render("./user/forgotpassword", {error});
    }

    async sendEmailForRecoveryPassword(req, res) {
        const user = await this.userService.selectOne(req.body.email);

        if (!user) {
            this.renderForgotPassword(req, res, "Este e-mail de usuário não existe")

        } else {
            this.sendEmailService.recoveryPassword(user.email, user.id)
            res.render("./user/forgotpasswordsended")
        }
    }
    
    renderUserRecoveryPassword(req, res) {
        res.render("./user/recoverypassword")
    }

    async updateUserPassword(req, res) {

        let idRecovery = Number(req.params.id)
        idRecovery -= Number(process.env.USER_PASSWORD_SEND_EMAIL);
        idRecovery /= Number(process.env.USER_PASSWORD_SEND_EMAIL);

        await this.userService.updatePassword(req.body.password, idRecovery)

        res.render("./user/recoverypasswordcomplete")

    }

}
     
export { UserController }