import express from "express";
import passport from "passport"
import methodOverride from "method-override";
import session from "express-session";
import flash from "connect-flash";
import { config } from "dotenv";
//import { auth } from "./config/auth";
import { people } from "./routes/people.js";
//import user from "./routes/user";

var one_day = 86400000;
var port = process.env.PORT || 9090

const app = express();
//auth(passport);
config();

app.use(session({
  secret : process.env.SECRET_SESSION,
  resave : true,
  saveUninitialized : true,
  cookie : { maxAge : one_day }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  res.locals.error = req.flash("error")
  res.locals.user = req.user || null
  next()
})

app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.set('view engine', 'ejs')
app.set('views', ('./views'))

//app.use("/user", user)
app.use("/", people)

app.listen(port, () => {
  console.log(`App listen in port: http://localhost:${port}`)
})