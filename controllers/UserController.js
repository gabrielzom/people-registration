import { UserService } from '../services/UserService.js'
import { SendEmailService } from '../services/SendEmailService.js'
import { isValidLinkToRecoveryPassword } from '../config/isValidLinkToRecoveryPassword.js'
import { isUuid, uuid } from 'uuidv4'
import ResponseUserMessages  from '../utils/ResponseUserMessages.js'
class UserController {
  userService = new UserService()
  sendEmailService = new SendEmailService()

  renderForgotPassword(req, res, error) { 
    res.render('./user/forgot-password', { error })
  }

  renderUserRecoveryPassword(req, res, error) { 
    res.render('./user/recovery-password', { error })
  }

  renderUserLogin(req, res) { 
    res.render('./user/login')
  }

  userLogin(req, res, next) { 
    this.userService.login(req, res, next).then(r => console.log)
  }

  userLogout(req, res) {
    this.userService.logout(req, res)
    res.redirect('/')
  }

  async renderUsersList(req, res, error_msg, success_msg) {
    const users = await this.userService.getAll()
    res.render('./user/list', {
      users,
      error_msg,
      success_msg,
    })
  }

  async registerUser(req, res) {
    const result = await this.userService.getByEmail(req.body.email)
    if (result) {
      return await this.renderUsersList(
          req,
          res,
          ResponseUserMessages.emailAlreadyInUse,
          ResponseUserMessages.empty
      )
    }
    const { email, verify_uuid }  = await this.userService.create(req.body)
    await this.sendEmailService.sendEmailForVerifyNewAccount(email, verify_uuid)
    await this.renderUsersList(
        req,
        res,
        ResponseUserMessages.empty,
        ResponseUserMessages.userIncludeSuccessfully
    )
  }

  async delete(req, res) {
    if (req.params.id === req.user.id) {
      return await this.renderUsersList(
          req,
          res,
          ResponseUserMessages.notDeleteAuthenUser,
          ResponseUserMessages.empty
      )
    }
    const { admin } = await this.userService.getById(req.params.id)
    if (admin) {
      return await this.renderUsersList(
          req,
          res,
          ResponseUserMessages.notDeleteAdminUser,
          ResponseUserMessages.empty
      )
    }
    await this.userService.delete(req.params.id)
    return res.redirect('./user/list')
  }

  async verifyUser(req, res) {
    await this.userService.verifyAccount(req.params.verify_uuid)
    return res.render('./user/verified')
  }

  async sendEmailForRecoveryPassword(req, res) {
    const user = await this.userService.getByEmail(req.body.email)
    if (!user) {
      return this.renderForgotPassword(req, res, ResponseUserMessages.userNotFound)
    }
    const recovery_uuid = uuid()
    await this.userService.setRecoveryUuid(user.id, recovery_uuid)
    await this.sendEmailService.recoveryPassword(user.email, recovery_uuid)
    res.render('./user/forgot-password-sent')
  }

  async updateUserPassword(req, res) {
    if (isUuid(req.params.recovery_uuid)) {
      const result = await this.userService.getByRecoveryUuid(
        req.params.recovery_uuid
      )
      if (!result) {
        return this.renderUserRecoveryPassword(
          req,
          res,
          ResponseUserMessages.recoveryPassLinkInvalid
        )
      }
      if (isValidLinkToRecoveryPassword(result.updatedAt)) {
        if (result.in_recovery) {
          await this.userService.updatePassword(
              req.body.password,
              req.params.recovery_uuid,
              result.id
          )
          return res.render('./user/recovery-password-complete')
        }
        return this.renderUserRecoveryPassword(
            req,
            res,
            ResponseUserMessages.recoveryPassdNotAutorized
        )
      }
    }
    return this.renderUserRecoveryPassword(
        req,
        res,
        ResponseUserMessages.recoveryPassLinkInvalid
    )
  }

}

export { UserController }
