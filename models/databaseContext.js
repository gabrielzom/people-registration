import { config } from 'dotenv'
import Sequelize from 'sequelize'
config()

const databaseContext = new Sequelize(process.env.MYSQL_URI)

databaseContext.authenticate()
    .then(() => {console.error("-- CONNECTION AUTHENTICATED")})
    .catch(() => {console.log("-- CONNECTION REFUSED")})

databaseContext.sync()


export { databaseContext }
