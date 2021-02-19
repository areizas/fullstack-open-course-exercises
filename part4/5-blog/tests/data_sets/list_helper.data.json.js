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
    {
        id: '4',
        title: 'title 4',
        author: 'author 3',
        url: 'http://url4.com',
        likes: 1
    },
]

const emptyList = []

const countLikesResults = {
    listWithOneBlog: 5,
    listWithMultipleBlogs: 7,
    emptyList: 0
}

const mostPopularBlogResults = {
    listWithOneBlog:
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5
        },
    listWithMultipleBlogs: {
        id: '3',
        title: 'title 3',
        author: 'author 3',
        url: 'http://url3.com',
        likes: 3
    },
    emptyList: {}
}

const mostBlogsResults = {
    listWithOneBlog:
        {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        },
    listWithMultipleBlogs:
        {
            author: 'author 3',
            blogs: 2
        },
    emptyList: {}
}

module.exports = {
    listWithOneBlog, listWithMultipleBlogs, emptyList,
    countLikesResults, mostPopularBlogResults, mostBlogsResults
}