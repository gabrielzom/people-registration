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
    recovery_uuid: {
        type: DataTypes.STRING(40),
        default: null
    },
    verify_uuid: {
        type: DataTypes.STRING(40),
        default: null
    }
})

export { Users }