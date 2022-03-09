import express from "express";
import { Router } from "express";
import passport from "passport";
import { accessLevel } from "../helpers/accessLevel.js";

const user = Router();

user.use(express.static("static"))

user.get("/login", (req, res) => {res.render("./user/login")})
user.post("/login", (req, res, next) => {
    passport.authenticate("local", { 
        successRedirect: "/",
        failureRedirect: "/user/login",
        failureFlash: true
    })(req, res, next)
})

export { user } 