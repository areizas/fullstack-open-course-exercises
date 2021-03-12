const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.password){
        response.status(400).json({error: 'missing password'})
    }

    const passwordHash = await bcrypt.hash(body.password, 10)

    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    await newUser.save()
    response.json(newUser)

})

module.exports = usersRouter