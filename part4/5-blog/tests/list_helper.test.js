const listHelper = require('../utils/list_helper')
const listHelperDataSet = require('./data_sets/list_helper.data.json')

test('dummy returns one', ()=>{
    const blog = []
    expect(listHelper.dummy(blog)).toBe(1)
})

describe('Total likes',()=>{

    test('Returns blog likes number when only one blog is in the list', ()=>{
        expect(listHelper.totalLikes(listHelperDataSet.listWithOneBlog))
            .toBe(listHelperDataSet.countLikesResults.listWithOneBlog)
    })

    test('Returns the sum of likes for all blogs in the list', ()=>{
        expect(listHelper.totalLikes(listHelperDataSet.listWithMultipleBlogs))
            .toBe(listHelperDataSet.countLikesResults.listWithMultipleBlogs)
    })

    test('Returns zero for empty list',()=>{
        expect(listHelper.totalLikes(listHelperDataSet.emptyList))
            .toBe(listHelperDataSet.countLikesResults.emptyList)
    })
})

describe('Get the most popular blog', ()=>{
    test('Returns the single blog when there is only one single blog in the list', ()=>{
        expect(listHelper.getMostPopularBlog(listHelperDataSet.listWithOneBlog))
            .toEqual(listHelperDataSet.mostPopularBlogResults.listWithOneBlog)
    })

    test('Returns the blog with higher amount of likes when there are multiple blogs on the list', ()=>{
        expect(listHelper.getMostPopularBlog(listHelperDataSet.listWithMultipleBlogs))
            .toEqual(listHelperDataSet.mostPopularBlogResults.listWithMultipleBlogs)
    })

    test('Returns a void object when a empty list is provide', ()=>{
        expect(listHelper.getMostPopularBlog(listHelperDataSet.emptyList))
            .toEqual(listHelperDataSet.mostPopularBlogResults.emptyList)
    })
})

describe('Get the author who has more blogs than any other author', ()=>{
    test('Returns the single blog author when there is only one single blog in the list', ()=>{
        expect(listHelper.mostBlogs (listHelperDataSet.listWithOneBlog))
            .toEqual(listHelperDataSet.authorWithMoreBlogsResults.listWithOneBlog)
    })

    test('Returns the author with higher amount of blogs when there are multiple blogs on the list', ()=>{
        expect(listHelper.mostBlogs (listHelperDataSet.listWithMultipleBlogs))
            .toEqual(listHelperDataSet.authorWithMoreBlogsResults.listWithMultipleBlogs)
    })

    test('Returns a void object when a empty list is provide', ()=>{
        expect(listHelper.mostBlogs (listHelperDataSet.emptyList))
            .toEqual(listHelperDataSet.authorWithMoreBlogsResults.emptyList)
    })
})