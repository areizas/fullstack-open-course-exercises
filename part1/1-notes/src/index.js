import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const App = () => {

    const [right, setRight] = useState(0)
    const [left, setLeft] = useState(0)

    return (
        <>
            <div>{left}</div>
            <button onClick={() => setLeft(left+1) }>left</button>
            <div>{right}</div>
            <button onClick={() => setRight(right+1) }>right</button>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
