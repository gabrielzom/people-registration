import DataTypes from "sequelize";
import { databaseContext } from "./databaseContext.js";

const Peoples = databaseContext.define("peoples", {

    name : DataTypes.STRING(30),
    surname : DataTypes.STRING(40),
    genre : DataTypes.STRING(10),
    name_in_hebrew : DataTypes.STRING(60),
    name_of_father_in_hebrew : DataTypes.STRING(60),
    name_of_mother_in_hebrew : DataTypes.STRING(60),
    name_of_grandmother : DataTypes.STRING(60),
    date_of_born : DataTypes.DATE,
    time_course_of_born : DataTypes.STRING(10),
    number_of_cellphone : DataTypes.STRING(20),
    email : DataTypes.STRING(60),
    zip_code : DataTypes.STRING(10),
    public_place : DataTypes.STRING(60),
    number_of_place : DataTypes.STRING(7),
    complement_of_adress : DataTypes.STRING(30),
    comments : DataTypes.STRING(300)
    
})

export { Peoples }