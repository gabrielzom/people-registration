import DataTypes from "sequelize";
import { databaseContext } from "./databaseContext.js";

const Users = databaseContext.define("users", {
    name_and_surname : DataTypes.STRING(30),
    email : DataTypes.STRING(60),
    password : DataTypes.BLOB,
    admin : {
        type : DataTypes.BOOLEAN,
        default : false
    },
    verified : {
        type : DataTypes.BOOLEAN,
        default : false
    },
    in_recovery : {
        type : DataTypes.BOOLEAN,
        default : false
    },
    recovery_hash : DataTypes.DECIMAL(20,2)
})

export { Users }