const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const morgan = require('morgan')
const middleware = require('./utils/middleware')

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect(config.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs',blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app