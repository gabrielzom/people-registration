import { config } from "dotenv";
config();

import Sequelize from "sequelize";
const databaseContext = new Sequelize(process.env.MYSQL_URI);

databaseContext.authenticate()
    .then(() => {console.error("-- CONNECTION AUTHENTICATED")})
    .catch(() => {console.log("-- CONNECTION REFUSED")});

databaseContext.sync();


export { databaseContext };
