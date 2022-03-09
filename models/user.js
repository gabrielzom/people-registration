import DataTypes from "sequelize";
import { databaseContext } from "./databaseContext.js";

const Users = databaseContext.define("users", {
    name_and_surname : DataTypes.STRING(30),
    email : DataTypes.STRING(60),
    password : DataTypes.BLOB,
    admin : {
        type : DataTypes.BOOLEAN,
        default : false
    }
})

export { Users }