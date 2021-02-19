const totalLikes = (blogs) => {

    if(blogs.length === 0){
        return 0;
    } else{
        return blogs.map(blog => blog.likes).reduce( (crnt, prev) => crnt + prev , 0 )
    }

}

const dummy = (blogs) => {
    return 1
}

module.exports = {
    dummy,
    totalLikes
}