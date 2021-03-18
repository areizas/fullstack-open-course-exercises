const mongoose = require('mongoose')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const {MongoMemoryServer} = require('mongodb-memory-server')

const mongodb = new MongoMemoryServer()

const connect = async () => {
    const uri = await mongodb.getUri()
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongodb.stop()
}

const clearDatabase = async () => {
    const collections = mongoose.connection.collections

    for (let key in collections){
        const collection = collections[key]
        await collection.deleteMany({})
    }
}

const setInitialUsers = async (initialUsers, ) => {
    for(let user of initialUsers){
        const passwordHash = await bcrypt.hash(user.password,10)
        const newUser = new User({username: user.username, name: user.name, passwordHash})
        await newUser.save()
    }
}

const getUsersInDb = async () => {
    const users = await User.find({})
    return users.map( user => user.toJSON())
}

module.exports = {
    connect, closeDatabase, clearDatabase,
    setInitialUsers, getUsersInDb
}