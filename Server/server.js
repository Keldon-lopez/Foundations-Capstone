require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getTickets} = require('./controller.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

// TICKETS
app.get('/tickets', getTickets)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))