import express from 'express'
import { Router } from 'express'
import { accessLevel } from '../helpers/accessLevel.js'
import { UserController } from '../controllers/UserController.js'

const user = Router()
user.use(express.static('static'))

const userController = new UserController()

user.get('/login', (req, res) =>
    userController.renderUserLogin(req, res)
)

user.post('/login',(req, res, next) =>
    userController.userLogin(req, res, next)
)

user.get('/logout', (req, res) =>
    userController.userLogout(req, res)
)

user.get('/list', accessLevel.isAdmin, (req, res) =>
    userController.renderUsersList(req, res, '', '')
)

user.post('/signup', accessLevel.isAdmin, (req, res) =>
    userController.registerUser(req, res)
)

user.get('/verify/:verify_uuid', (req, res) =>
    userController.verifyUser(req, res) 
)

user.get('/delete/:id', accessLevel.isAdmin, (req, res) =>
    userController.delete(req, res)
)

user.get('/forgot-password', (req, res) =>
    userController.renderForgotPassword(req, res, '')
)

user.post('/forgot-password', (req, res) =>
    userController.sendEmailForRecoveryPassword(req, res)
)

user.get('/recovery-password/:id', (req, res) =>
    userController.renderUserRecoveryPassword(req, res, '')
)

user.put('/recovery-password/:recovery_uuid', (req, res) =>
    userController.updateUserPassword(req, res)
)

export { user } 