import { UserService } from "../services/UserService.js";
import { SendEmailService } from "../services/SendEmailService.js";
import { config } from "dotenv";
config();

function isValidLink(updatedAt) {

    let newDate = new Date().toISOString();
    updatedAt = updatedAt.toISOString();
    
    let newDay = Number(newDate.slice(8,10));
    let updatedDay = Number(updatedAt.slice(8,10))

    if (newDay > updatedDay) {
        return false;

    } else {
        let newHours   = Number(newDate.slice(11,13));
        let newMinutes = Number(newDate.slice(14,16));
        newMinutes += (newHours*60);

        let updatedHours = Number(updatedAt.slice(11,13));
        let updatedMinutes = Number(updatedAt.slice(14,16));
        updatedMinutes += (updatedHours*60);

        let diferenceMinutes = newMinutes - updatedMinutes;

        if (diferenceMinutes <= 20) {
            return true;

        } else {
            return false;
        }
    }
}

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

        const result = await this.userService.selectOneByEmail(req.body.email);

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
        
        } else if (req.user.admin == 1) {
            this.renderUsersList(req, res, "Não é possível deletar um usuário administrador. ", "")
        
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
        const user = await this.userService.selectOneByEmail(req.body.email);

        if (!user) {
            this.renderForgotPassword(req, res, "Este e-mail de usuário não existe")

        } else {
            this.sendEmailService.recoveryPassword(user.email, user.id)
            res.render("./user/forgotpasswordsended")
        }
    }
    
    renderUserRecoveryPassword(req, res, error) {
        res.render("./user/recoverypassword", { error })
    }

    async updateUserPassword(req, res) {

        let recoveryHash = Number(req.params.id).toFixed(2)

        let result = await this.userService.selectOneByRecoveryHash(recoveryHash)

        if (result == null) {
            this.renderUserRecoveryPassword(req, res, "Link de recuperação de senha expirado.")

        } else {

            if (isValidLink(result.updatedAt)) {

                if (result && result.in_recovery == 1) {
                    await this.userService.updatePassword(req.body.password, recoveryHash)
                    res.render("./user/recoverypasswordcomplete")
        
                } else {
                    this.renderUserRecoveryPassword(req, res, "Usuário não solicitou recuperação de senha e/ou não autorizado")
                }
    
            } else {
                this.renderUserRecoveryPassword(req, res, "Link de recuperação de senha expirado.")
            }
        }
    }
}
    
export { UserController }