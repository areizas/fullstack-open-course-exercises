import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    console.log('Hello from App component')

    const now = new Date()
    const a = 10
    const b = 15

    return (
        <div>
            <p>Hello world, it is {now.toString()}</p>
            <p> {a} + {b} = {a+b} </p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))