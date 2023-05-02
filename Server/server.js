require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getTickets, createTicket, createUser, updateValue} = require('./controller.js')

app.use(express.static(`${__dirname}../Public`))

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

// TICKETS
app.get('/tickets', getTickets)
app.post('/tickets', createTicket)
app.put('/tickets',updateValue)
app.post('/users', createUser)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))