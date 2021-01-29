import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const App = () => {

    const [clicks, setClicks] = useState({
        right: 0,
        left: 0
    })

    const handleLeftClick = () => setClicks({...clicks, left: clicks.left+=1})

    const  handleRightClick = () => setClicks({...clicks, right: clicks.right+=1})

    return (
        <>
            <div>{clicks.left}</div>
            <button onClick={handleLeftClick}>left</button>
            <div>{clicks.right}</div>
            <button onClick={handleRightClick}>right</button>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
