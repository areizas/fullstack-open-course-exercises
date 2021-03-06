const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('Connecting to mongo DB')

mongoose.connect(config.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then( () => logger.info('Connected to MongoDB'))
    .catch( error => logger.error('error connection to MongoDB: ',error.message))

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes',notesRouter)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app