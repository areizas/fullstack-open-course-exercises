const usersRouter = require('express').Router()
const Users = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter
    .get('/', async (request, response) => {
        const users = await Users.find({})
        response.json(users)
    })

usersRouter
    .post('/',async (request,response)=>{
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password,saltRounds)

        const user = new Users({
            username: body.username,
            user: body.user,
            passwordHash: passwordHash
        })

        const newUser = await user.save()
        response.json(newUser)
    })

module.exports = usersRouter