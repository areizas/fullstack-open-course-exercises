const mongoose = require('mongoose')
const Blog = require('../../models/blog')
const { MongoMemoryServer } = require('mongodb-memory-server')

const mongodb = new MongoMemoryServer()

const connect = async () => {
    const uri = await mongodb.getUri()
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
    await mongoose.connect(uri, mongooseOpts)
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

const setInitialData = async (initialBlogs) => {
    for (let blog of initialBlogs){
        const newBlog = new Blog(blog)
        await newBlog.save()
    }
}

const getBlogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map( blog => blog.toJSON())
}

module.exports = {
    connect, closeDatabase, clearDatabase, setInitialData,
    getBlogsInDb
}