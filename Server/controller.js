const dotenv = require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists cities;
            drop table if exists countries;
            create table users (
                user_id serial primary key, 
                username VARCHAR(40) NOT NULL
            );
            create table tickets (
                ticket_id serial primary key,
                username string REFERENCES users(username),
                priority integer NOT NULL,
                issue_type string NOT NULL,
                status string NOT NULL,
                description string NOT NULL                
            );
            insert into users (username)
            values ('testUser');

            insert into tickets (username, priority, issue_type, status, description) 
            values ('testUser', 1, 'computer', 'open', 'This is a test ticket');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getTickets: (req, res) => {
        sequelize.query('select * from tickets;')
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
         }
        )
    },
}