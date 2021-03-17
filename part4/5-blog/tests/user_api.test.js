const userData = require('./data_sets/user_api.data')
const userHelper = require('./test_helper/user_api.helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

beforeAll(async () => await userHelper.connect())
beforeEach( async () => await userHelper.setInitialUsers(userData.initialUsers))
afterEach( async () => await userHelper.clearDatabase())
afterAll( async () => await userHelper.closeDatabase())

describe('When users exist on DB', () => {
    test('Users are retrieve correctly', async () => {

        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toHaveLength(userData.initialUsers.length)
    })

    test('New User is created correctly', async () => {

        await api
            .post('/api/users')
            .send(userData.newCorrectUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        let users = await userHelper.getUsersInDb()
        users = JSON.parse(JSON.stringify(users))

        expect(users).toHaveLength(userData.initialUsers.length + 1)
    })

    describe('When not allowed data is sent', () => {


        const userIsNotCreatedInDbTest = async () => {
            let users = await userHelper.getUsersInDb()
            users = JSON.parse(JSON.stringify(users))
            expect(users).toHaveLength(userData.initialUsers.length)
        }

        test('User without password is not created', async () => {
            await api
                .post('/api/users')
                .send(userData.newUserWiithOutPassword)
                .expect(400)

            await userIsNotCreatedInDbTest()
        })

        test('User without username is not created', async () => {
            await api
                .post('/api/users')
                .send(userData.newUserWiithOutUsername)
                .expect(400)

            await userIsNotCreatedInDbTest()
        })

        test('User with password shorter than 3 characters is not created', async () => {
            await api
                .post('/api/users')
                .send(userData.newUserWithShortPassword)
                .expect(400)

            await userIsNotCreatedInDbTest()
        })

        test('User with username shorter than 3 characters is not created', async () => {
            await api
                .post('/api/users')
                .send(userData.newUserWithShortUsername)
                .expect(400)

            await userIsNotCreatedInDbTest()
        })

    })
})

