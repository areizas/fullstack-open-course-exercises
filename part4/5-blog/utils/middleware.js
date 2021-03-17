
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

const getToken = (request, response, next) => {
    const authorization = request.get('authorization')

    if(authorization && authorization.toString().toLowerCase().startsWith('bearer ')){
        request.token = authorization.toString().substring(7)
    }

    next()
}

module.exports = {
    unknownEndpoint, errorHandler, getToken
}