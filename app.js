const express = require("express");
//const cliente = require("./routes/cliente")
//const home    = require("./routes/home")
//const usuario = require("./routes/usuario")
//const send    = require("./routes/send")
//const methodOverride = require("method-override");
//const session = require("express-session")
//const flash = require("connect-flash")
const app = express();
//const passport = require("passport")
const fs = require("fs")
var um_dia = 86400000;

//require("./config/auth")(passport)
require("dotenv").config();

/*app.use(session({
  secret : process.env.KEY,
  resave : true,
  saveUninitialized : true,
  cookie : { maxAge : um_dia }
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

app.use("/usuario", usuario)
app.use("/usuario/excluir", usuario)
app.use("/usuario/redefinir", usuario)
app.use("/usuario/alterar-senha", usuario)

app.use("/clientes", cliente)
app.use("/clientes/historico", cliente)
app.use("/clientes/historico/incluir", cliente)
app.use("/clientes/historico/editar", cliente)
app.use("/clientes/historico/excluir", cliente)
app.use("/clientes/editar", cliente)
app.use("/clientes/excluir", cliente)
app.use("/", home)
app.use("/send", send)

app.set('view engine', 'ejs')
app.set('views', ('./views'))
*/
let port = process.env.PORT || 9090

app.listen(port, () => {
  console.log(`App listen in port: http://localhost:${port}`)
})