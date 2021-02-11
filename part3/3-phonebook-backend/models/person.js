const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connection to MongoDB')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON',{
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject.__v
    }
})

module.exports = mongoose.model("Person",personSchema)