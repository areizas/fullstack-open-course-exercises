const initialUsers = [
    {
        username: 'username1',
        name: 'name1',
        password: 'password1'
    },
    {
        username: 'username2',
        name: 'name2',
        password: 'password2'
    }
]

const newCorrectUser = {
        username: 'username3',
        name: 'name3',
        password: 'password3'
    }

const newUserWiithOutPassword = {
    username: 'username3',
    name: 'name3'
}

const newUserWiithOutUsername = {
    name: 'name3',
    password: 'password3'
}

const newUserWithShortPassword = {
    username: 'username3',
    name: 'name3',
    password: 'pa'
}

const newUserWithShortUsername = {
    username: 'us',
    name: 'name3',
    password: 'password3'
}

module.exports = {
    initialUsers, newCorrectUser,
    newUserWiithOutPassword, newUserWiithOutUsername, newUserWithShortPassword, newUserWithShortUsername
}