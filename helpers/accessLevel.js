import ResponseAccessLevelMessages from "../utils/ResponseAccessLevelMessages"

const accessLevel = {

  isAdmin : (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin == 1 && req.user.verified == 1) {
      return next()
    
    } else if (req.isAuthenticated() && req.user.admin == 1 && req.user.verified == 0) {
      req.flash("error_msg", ResponseAccessLevelMessages.confirmYourEmail)
      res.redirect("/")

    } else {
      req.flash("error_msg", ResponseAccessLevelMessages.useAdminLogin)
       res.redirect("/")
    }
  },

  isOperator : (req, res, next) => {
    if (req.isAuthenticated() && req.user.verified == 1) {
      return next()
        
    } else if (req.isAuthenticated() && req.user.verified == 0) {
      req.flash("error_msg", ResponseAccessLevelMessages.confirmYourEmail)
      res.redirect("/")
    }
  
    else {
      req.flash("error_msg", ResponseAccessLevelMessages.useOperatorLogin)
      res.redirect("/")
    }
  }
}

export { accessLevel }