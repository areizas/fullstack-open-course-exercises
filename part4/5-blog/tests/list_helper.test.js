const listHelper = require('../utils/list_helper')
const listHelperDataSet = require('./data_sets/list_helper.data.json')

test('dummy returns one', ()=>{
    const blog = []
    expect(listHelper.dummy(blog)).toBe(1)
})

describe('Total likes',()=>{

    test('Returns blog likes number when only one blog is in the list', ()=>{
        expect(listHelper.totalLikes(listHelperDataSet.listWithOneBlog)).toBe(listHelperDataSet.listWithOneBlog[0].likes)
    })

    test('Returns the sum of likes for all blogs in the list', ()=>{
        expect(listHelper.totalLikes(listHelperDataSet.listWithMultipleBlogs)).toBe(6)
    })

    test('Returns zero for empty list',()=>{
        expect(listHelper.totalLikes(listHelperDataSet.emptyList)).toBe(0)
    })
})