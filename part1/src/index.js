import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

    console.log('Hello from App component')

    return (
        <div>
            <p>Hello world</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))