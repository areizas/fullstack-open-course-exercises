const mongoose = require('mongoose')

const mongooseConnect = () => {
    const password = process.argv[2]
    const url = `mongodb+srv://fullstack2:${password}@cluster0.lg40a.mongodb.net/phonebook-app?retryWrites=true`
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
}

const getPersonModel = () => {
    const schema = new mongoose.Schema({
        name: String,
        number: String
    })

    return mongoose.model('Person',schema)
}

if (process.argv.length === 3){
    mongooseConnect()
    const Person = getPersonModel()

    console.log('Phonebook:')

    Person.find({}).then( result => {
        result.forEach( person => console.log(`${person.name} ${person.number}`))
        mongoose.connection.clo
    })

} else if(process.argv.length === 5) {
    mongooseConnect()
    const Person = getPersonModel()

    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    newPerson
        .save()
        .then( () => {
            console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
            mongoose.connection.close()
        })

} else {
    console.log('Wrong parameters. please try with correct parameters')
}