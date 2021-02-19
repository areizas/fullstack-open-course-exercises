const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    if(blogs.length === 0){
        return 0;
    } else{
        return blogs.reduce( (likesCount, blog) => likesCount + blog.likes , 0 )
    }

}

const getMostPopularBlog = (blogs) => {
    if(blogs.length === 0){
        return {};
    } else{
        return blogs.reduce((currentBlog, prevBlog) => currentBlog.likes > prevBlog.likes ? currentBlog : prevBlog)
    }
}

const getAuthorWithHigherAmountOfBlogs = (blogs) => {
    if(blogs.length === 0){
        return {};
    } else{
        let authors = blogs.map(blog => blog.author)
        authors = [... new Set(authors)]

        authors = authors.map(author => (
            {
                author: author,
                blogs: Number(blogs.filter( blog => blog.author === author).length)
            }
        ))

        return authors.reduce( (currentAuthor, prevAuthor) => currentAuthor.blogs > prevAuthor.blogs ? currentAuthor : prevAuthor )
    }
}

module.exports = {
    dummy,
    totalLikes,
    getMostPopularBlog,
    getAuthorWithHigherAmountOfBlogs
}