const blogRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const getToken = (request) => {
    const authorization = request.get('authorization')

    if(authorization && authorization.toString().toLowerCase().startsWith('bearer ')){
        return authorization.toString().substring(7)
    }

    return null
}

blogRouter.get('/',async (request,response,next) => {
    const blogs = await Blog.find({}).populate('user',{username:1, name:1})
    response.json(blogs)
})

blogRouter.get('/:id',(request,response,next) => {
    Blog
        .findById(request.params.id).populate('user',{username:1, name:1})
        .then( blog => {
            if(blog){
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch( error => next(error) )
})

blogRouter.post('/',async (request,response,next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token,config.SECRET)

    if (!request.token || !decodedToken.id){
        return response.status(401).json({error: 'Invalid or malformed token'})
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = { ...body,
        user: user._id
    }

    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.put('/:id',async (request,response,next) => {
    const blog = { ...request.body }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true })
    response.json(updatedBlog)
})

blogRouter.delete('/:id',async (request,response,next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter