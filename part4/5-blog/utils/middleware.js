
const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

    if( error.name === 'ValidationError' ){
        response.status(400).json({ error: error.message })
    } else if ( error.name === 'CastError' ){
        response.status(400).json({ error: 'malformed id' })
    }

    next(error)

}

module.exports = {
    unknownEndpoint, errorHandler
}