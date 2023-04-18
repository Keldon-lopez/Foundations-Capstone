require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getTickets} = require('./controller.js')

// DEV
app.post('/seed', seed)

// COUNTRIES
app.get('/tickets', getTickets)