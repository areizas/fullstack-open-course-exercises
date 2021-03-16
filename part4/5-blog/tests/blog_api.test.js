const blogApiHelper = require('./test_helper/blog_api.helper')
const blogApiDataSet = require('./data_sets/blog_api.data')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

beforeAll(async () => await blogApiHelper.connect() )
beforeEach( async () => await blogApiHelper.setInitialData(blogApiDataSet.initialBlogs))
afterEach(async () => await blogApiHelper.clearDatabase())
afterAll(async () => await blogApiHelper.closeDatabase())

test('Blogs are returned correctly with json format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('All blogs are returned correctly', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogApiDataSet.initialBlogs.length)
})

test('Check that the unique blog identifier is named id', async () => {
    let blogs = await blogApiHelper.getBlogsInDb()
    blogs = JSON.parse(JSON.stringify(blogs))

    for( let blog of blogs ){
        expect(blog.id).toBeDefined()
    }
})

test('A new blog is created correctly', async () => {
    const newBlog = {
        title: 'new title',
        author: 'new author',
        url: 'http://new-url.com',
        likes: 0
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type',/application\/json/)

    const newBlogList = await blogApiHelper.getBlogsInDb()

    expect(newBlogList).toHaveLength(blogApiDataSet.initialBlogs.length + 1)
})

test('Check that the default value for likes parameter will be set to 0 when this parameter is not send in the request', async () => {
    const newBlog = {
        title: 'new title',
        author: 'new author',
        url: 'http://new-url.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)

    const newBlogList = await blogApiHelper.getBlogsInDb()

    expect(newBlogList.pop().likes).toBe(0)
})

test('A blog is not created when a tittle is not provided', async () => {
    const newBlog = {
        author: 'new author',
        url: 'http://new-url.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('A blog is deleted correctly', async () => {

    const blogList = await blogApiHelper.getBlogsInDb()

    await api
        .delete(`/api/blogs/${blogList[0].id}`)
        .expect(204)

    const newBlogList = await blogApiHelper.getBlogsInDb()
    expect(newBlogList).toHaveLength(blogApiDataSet.initialBlogs.length - 1)
})

test('Blog is updated correctly', async () => {

    const blogList = await blogApiHelper.getBlogsInDb()
    const newBlog = { ...blogList[0],  likes: 5 }

    await api
        .put(`/api/blogs/${blogList[0].id}`)
        .send(newBlog)
        .expect(200)

    const newBlogList = await blogApiHelper.getBlogsInDb()

    expect(newBlogList[0].likes).toBe(newBlog.likes)
})