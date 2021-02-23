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