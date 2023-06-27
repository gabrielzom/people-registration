import { Users } from '../models/user.js'
import { databaseContext } from '../models/databaseContext.js'
import passport from 'passport'
import { uuid } from 'uuidv4'
import { config } from 'dotenv'
config()

class UserService {
  async getById(id) {
    return await Users.findByPk(id)
  }

  async getByRecoveryUuid(recovery_uuid) {
    return await Users.findOne({
      where: { recovery_uuid },
    })
  }

  async getByEmail(email) {
    return await Users.findOne({
      where: { email },
    })
  }

  async getAll() {
    return await Users.findAll()
  }

  async create(body) {
    const admin = !!body ? 1 : 0
    return await Users.create({
      name_and_surname: body.name_and_surname,
      email: body.email,
      password: databaseContext.literal(
        `AES_ENCRYPT('${body.password}','${process.env.USER_PASSWORD_KEY}')`
      ),
      admin: admin,
      verify_uuid: uuid()
    })
  }

  async delete(id) {
    return await Users.destroy({
      where: { id },
    })
  }

  async login(req, res, next) {

    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/user/login',
      failureFlash: true,
    })(req, res, next)
  }

  logout(req, res) {
    req.logout()
    req.flash('success_msg', 'Você foi desconectado com sucesso')
  }

  async setRecoveryUuid(id, recovery_uuid) {
    return await Users.update(
      {
        in_recovery: 1,
        recovery_uuid,
      },
      {
        where: { id },
      }
    )
  }

  async verifyAccount(verify_uuid) {
    return await Users.update(
      {
        verified: 1,
      },
      {
        where: { verify_uuid },
      }
    )
  }

  async updatePassword(password, recovery_uuid, id) {
    return await Users.update(
      {
        password: databaseContext.literal(
          `AES_ENCRYPT('${password}','${process.env.USER_PASSWORD_KEY}')`
        ),
        in_recovery: 0,
      },
      {
        where: { recovery_uuid, id },
      }
    )
  }

}

export { UserService }
