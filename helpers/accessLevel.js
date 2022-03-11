const accessLevel = {

  isAdmin : (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin == 1 && req.user.verified == 1) {
      return next()
    
    } else if (req.isAuthenticated() && req.user.admin == 1 && req.user.verified == 0) {
      req.flash("error_msg", "Confirme seu e-mail de cadastro para ter acesso.")
      res.redirect("/")

    } else {
      req.flash("error_msg", "Use um login de administrador para ter acesso.")
       res.redirect("/")
    }
  },

  isOperator : (req, res, next) => {
    if (req.isAuthenticated() && req.user.verified == 1) {
      return next()
        
    } else if (req.isAuthenticated() && req.user.verified == 0) {
      req.flash("error_msg", "Confirme seu e-mail de cadastro para ter acesso.")
      res.redirect("/")
    }
  
    else {
      req.flash("error_msg", "Use um login de operador para ter acesso.")
      res.redirect("/")
    }
  }
}

export { accessLevel }