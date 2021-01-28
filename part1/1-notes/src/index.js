import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    const {name,age} = props
    const bornYear = () => new Date().getFullYear()  - age
    return (
        <div>
            <p> Hello {name}, you are {age} years old.</p>
            <p> So you were probably born in {bornYear()}</p>
        </div>
    )
}

const Footer = () => {
    return (
        <div>
            greeting app created by <a href="https://github.com/areizas">areizas</a>
        </div>
    )
}

const App = () => {
    const name = "Camila"
    const age = 22
    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Mat" age={24}/>
            <Hello name={name} age={age}/>
            <Footer />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))