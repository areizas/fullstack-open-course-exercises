const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('Connection to MongoDB')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    number: {
        type: String
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON',{
    transform: (document, returnObject) => {
        returnObject.id = returnObject._id.toString()
        delete returnObject.__v
    }
})

module.exports = mongoose.model("Person",personSchema)