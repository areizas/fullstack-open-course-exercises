const userData = require('./data_sets/user_api.data')
const userHelper = require('./test_helper/user_api.helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

beforeAll(async () => await userHelper.connect())
beforeEach( async () => await userHelper.setInitialUsers(userData.initialUsers))
afterEach( async () => await userHelper.clearDatabase())
afterAll( async () => await userHelper.closeDatabase())

test('Users are retrieve correctly', async () => {

    const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(userData.initialUsers.length)
})

test('User is created correctly', async () => {

    await api
        .post('/api/users')
        .send(userData.newCorrectUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    let users = await userHelper.getUsersInDb()
    users = JSON.parse(JSON.stringify(users))
    console.log(users)
    console.log(users.length)

    expect(users).toHaveLength(userData.initialUsers.length + 1)
})