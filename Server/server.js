require('dotenv').config()
app.listen(process.env.SERVER_PORT, () => console.log(`server running on port ${process.env.SERVER_PORT}`));
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})