import { UserService } from "../services/UserService.js";
import { SendEmailService } from "../services/SendEmailService.js";
import { isValidLinkToRecoveryPassword } from "../config/isValidLinkToRecoveryPassword.js";
import { config } from "dotenv";
import { isUuid, uuid } from "uuidv4";
import ResponseMessages  from "../utils/ResponseMessages.js"
config();
class UserController {
  userService = new UserService();
  
  sendEmailService = new SendEmailService();

  async renderUsersList(req, res, error_msg, success_msg) {
    const users = await this.userService.list();
    res.render("./user/list", {
      users,
      error_msg,
      success_msg,
    });
  }

  renderForgotPassword(req, res, error) {
    res.render("./user/forgotpassword", { error });
  }

  renderUserRecoveryPassword(req, res, error) {
    res.render("./user/recoverypassword", { error });
  }

  renderUserLogin(req, res) {
    res.render("./user/login");
  }

  userLogin(req, res, next) {
    this.userService.login(req, res, next);
  }

  userLogout(req, res) {
    this.userService.logout(req, res);
    res.redirect("/");
  }


  async registerUser(req, res) {
    const result = await this.userService.selectOneByEmail(req.body.email);

    if (result) {
      this.renderUsersList(
        req,
        res,
        ResponseMessages.emailAlreadyInUse,
        ResponseMessages.empty
      );
    } else {
      const user = await this.userService.save(req.body);
      console.log(user);
      await this.sendEmailService.sendEmailForVerifyNewAccount(
        user.email,
        user.verify_uuid
      );
      this.renderUsersList(
        req,
        res,
        ResponseMessages.empty,
        ResponseMessages.userIncludeSuccessfully
      );
    }
  }

  async deleteUser(req, res) {
    if (req.params.id == req.user.id) {
      this.renderUsersList(
        req,
        res,
        ResponseMessages.notDeleteAuthenUser,
        ResponseMessages.empty
      );
    } else if (
      (await this.userService.selectOneById(req.params.id)).admin == 1
    ) {
      this.renderUsersList(
        req,
        res,
        ResponseMessages.notDeleteAdminUser,
        ResponseMessages.empty
      );
    } else {
      await this.userService.delete(req.params.id);
      return res.redirect("/user/list");
    }
  }

  async verifyUser(req, res) {
    await this.userService.verifyAccount(req.params.verify_uuid);

    return res.render("./user/verified");
  }



  async sendEmailForRecoveryPassword(req, res) {
    const user = await this.userService.selectOneByEmail(req.body.email);

    if (!user) {
      this.renderForgotPassword(req, res, ResponseMessages.userNotFound);
    } else {
      const recovery_uuid = uuid();
      await this.userService.setRecoveryUuid(idRecovery, recovery_uuid);
      this.sendEmailService.recoveryPassword(user.email, recovery_uuid);
      res.render("./user/forgotpasswordsended");
    }
  }

  async updateUserPassword(req, res) {
    if (isUuid(req.params.recovery_uuid)) {
      let result = await this.userService.selectOneByRecoveryUuid(
        req.params.recovery_uuid
      );

      if (!result) {
        this.renderUserRecoveryPassword(
          req,
          res,
          ResponseMessages.recoveryPassLinkInvalid
        );
      } else {
        if (isValidLinkToRecoveryPassword(result.updatedAt)) {
          if (result.in_recovery === 1) {
            await this.userService.updatePassword(
              req.body.password,
              req.params.recovery_uuid,
              result.id
            );
            res.render("./user/recoverypasswordcomplete");
          } else {
            this.renderUserRecoveryPassword(
              req,
              res,
              ResponseMessages.recoveryPassdNotAutorized
            );
          }
        }
      }
    } else {
      this.renderUserRecoveryPassword(
        req,
        res,
        ResponseMessages.recoveryPassLinkInvalid
      );
    }
  }
}

export { UserController };
