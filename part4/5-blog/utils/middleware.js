const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const unknownEndpoint = (request, response) => {
    return response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

    if( error.name === 'ValidationError' ){
        return response.status(400).json({ error: error.message })
    } else if ( error.name === 'CastError' ){
        return response.status(400).json({ error: 'malformed id' })
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error: 'invalid token' })
    }

    next(error)

}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if(authorization && authorization.toString().toLowerCase().startsWith('bearer ')){
        request.token = authorization.toString().substring(7)
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)

    if(!request.token || !decodedToken){
        return response.status(401).json({error: 'Invalid token'})
    }

    const user = await User.findById(decodedToken.id)
    request.user = user

    next()
}

module.exports = {
    unknownEndpoint, errorHandler, tokenExtractor, userExtractor
}