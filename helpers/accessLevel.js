  const accessLevel = {
    isAdmin : (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
        
      } else {
        req.flash("error_msg", "Use um login de administrador para ter acesso.")
        res.redirect("/")
      }
    }
  }

export { accessLevel }