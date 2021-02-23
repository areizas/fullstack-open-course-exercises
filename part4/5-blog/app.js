const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const morgan = require('morgan')
const middleware = require('./utils/middleware')

if(process.env.NODE_ENV !== 'test'){
    mongoose.connect(config.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/blogs',blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app