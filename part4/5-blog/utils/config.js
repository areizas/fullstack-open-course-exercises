require('dotenv').config()

const MONGOOSE_URI = process.env.MONGOOSE_URI
const PORT = process.env.PORT
const SECRET = process.env.SECRET

module.exports = {
    MONGOOSE_URI, PORT, SECRET
}