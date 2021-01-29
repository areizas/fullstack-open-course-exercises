import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [counter, setCounter] = useState(0)

    setTimeout(
        () => setCounter(counter+1),
        1000
    )

    return (
        <>
            <p>{counter}</p>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
