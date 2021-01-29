import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const App = () => {

    const [state, setState] = useState({
        right: 0,
        left: 0
    })

    const handleLeftClick = () => {
        setState ({
            left: state.left+1,
            right: state.right
        })
    }

    const  handleRightClick = () => {
        setState( {
            left: state.left,
            right: state.right + 1
        })
    }

    return (
        <>
            <div>{state.left}</div>
            <button onClick={handleLeftClick}>left</button>
            <div>{state.right}</div>
            <button onClick={handleRightClick}>right</button>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
