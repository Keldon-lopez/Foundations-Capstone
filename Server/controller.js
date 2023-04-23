const dotenv = require('dotenv').config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require('sequelize')
const { QueryTypes } = require('sequelize');

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
            drop table if exists users;
            drop table if exists tickets;

            create table users (
                user_id serial primary key, 
                username varchar NOT NULL UNIQUE
            );
            create table tickets (
                ticket_id serial primary key,
                username varchar REFERENCES users(username),
                priority integer ,
                type varchar ,
                status varchar ,
                description varchar                 
            );

            insert into users (username)
            values ('testUser');

            insert into tickets (username, priority, type, status, description) 
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

    createUser: (req, res) =>{
        const {username} = req.body;
        sequelize.query(`SELECT * FROM users WHERE username ='${username}';`,{ type: QueryTypes.SELECT })
        .then((dbRes) => {
            let emptyArr = [];
            // This is always returning false and I am not sure why.
            if (dbRes === emptyArr) {
                console.log("noUserFound",typeof dbRes, username)
            } else {
                console.log("userFound", dbRes, typeof dbRes, emptyArr, typeof emptyArr)
            }
            
            res.status(200).send()})
        .catch(err => console.log("err",err))
    },

    createTicket: (req, res) => {
        const {username, priority, type, description} = req.body;
        sequelize.query(`
        insert into tickets (username, priority, type, status, description) 
        values ('${username}', ${priority}, '${type}', 'open', '${description}');`)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
         }).catch((err) => {
            console.log(err);
         })
    },
    
}