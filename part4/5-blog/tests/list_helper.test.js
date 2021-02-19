const listHelper = require('../utils/list_helper')

test('dummy returns one', ()=>{
    const blog = []
    expect(listHelper.dummy(blog)).toBe(1)
})

describe('Total likes',()=>{

    const listWithOneBlog = [
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
        }
    ]

    const listWithMultipleBlogs = [
        {
            id: '1',
            title: 'title 1',
            author: 'author 1',
            url: 'http://url1.com',
            likes: 1
        },
        {
            id: '2',
            title: 'title 2',
            author: 'author 2',
            url: 'http://url2.com',
            likes: 2
        },
        {
            id: '3',
            title: 'title 3',
            author: 'author 3',
            url: 'http://url3.com',
            likes: 3
        },
    ]

    const emptyList = []

    test('Returns blog likes number when only one blog is in the list', ()=>{
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes)
    })

    test('Returns the sum of likes for all blogs in the list', ()=>{
        expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(6)
    })

    test('Returns zero for empty list',()=>{
        expect(listHelper.totalLikes(emptyList)).toBe(0)
    })
})