import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [counter, setCounter] = useState(0)

    const handleButton = () => setCounter(counter+1)

    return (
        <>
            <p>{counter}</p>
            <button onClick={() => setCounter(counter-1)}>-</button>
            <button onClick={() => setCounter(0)}>zero</button>
            <button onClick={() => setCounter(counter+1)}>+</button>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
