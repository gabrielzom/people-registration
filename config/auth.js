import { Strategy } from "passport-local";
import { Users } from "../models/user.js";
import { databaseContext } from "../models/databaseContext.js";
import { config } from "dotenv";
config();

const auth = (passport) => {
  passport.use(new Strategy({usernameField : "email", passwordField : "password"}, (email, password, done) => {
    Users.findOne({
      where : {
        email : email
      }
    })
    .then((result) => {  
      if (!result) {
        return done(null, false, { message : "Este usuário não existe" })

      } else {
        databaseContext.query(`SELECT CAST(AES_DECRYPT(password, '${process.env.USER_PASSWORD_KEY}') AS CHAR) AS password FROM users WHERE email='${email}'`)
          .then((user) => {
            if (user[0][0].password == password) {
              return done(null, result)
            
            } else {
              return done(null, false, { message : "Sua senha está incorreta" })
            }
        })
      } 
    }).catch(error => console.log(error))
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    Users.findByPk(id)
      .then((user) => {
        if(!user) {
          let error = new Error("Não identificado")
          done(error, user)

        } else {
          done(null, user)
        }
      })
      .catch(error => console.log(error))
  })
}

export { auth }