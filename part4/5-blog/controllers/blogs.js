const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',(request,response,next) => {
    Blog
        .find({})
        .then( blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
})

blogRouter.get('/:id',(request,response,next) => {
    Blog
        .findById(request.params.id)
        .then( blog => {
            if(blog){
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch( error => next(error) )
})

blogRouter.post('/',(request,response,next) => {
    const blog = new Blog(request.body)

    blog.save()
        .then( newBlog => {
            response.status(201).json(newBlog)
        })
        .catch( error => next(error) )
})

blogRouter.put('/:id',(request,response,next) => {
    const blog = { ...request.body }

    Blog
        .findByIdAndUpdate(request.params.id,blog,{ new: true })
        .then( updatedBlog => {
            response.json(updatedBlog)
        })
        .catch( error => next(error) )
})

blogRouter.delete('/:id',(request,response,next) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then( () => {
            response.status(204).end()
        })
        .catch( error => next(error) )
})

module.exports = blogRouter