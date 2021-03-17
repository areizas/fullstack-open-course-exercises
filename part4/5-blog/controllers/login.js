const jwt = require('jsonwebtoken')
const User = require('../models/user')
const loginRouter = require('express').Router()
const bcryp = require('bcrypt')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({username: body.username})
    const passwordIsCorrect = !user ? false : await bcryp.compare(body.password, user.passwordHash)

    if (!(user && passwordIsCorrect)){
        return response.status(401).json({error: 'Invalid username or password'})
    }

    const userForToken = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(userForToken, config.SECRET)

    response.status(200).send({token, username: user.username, id: user._id})

})

module.exports = loginRouter