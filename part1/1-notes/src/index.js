import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const History = ({allClicks}) => {
    if(allClicks.length === 0){
        return (
            <p>You should click on left or right buttons</p>
        )
    }
    return (
        <p>button press history: {allClicks.join(' ')} </p>
    )
}

const App = () => {

    const [clicks, setClicks] = useState({
        right: 0,
        left: 0
    })

    const [allClicks, setAllClicks] = useState([])

    const handleLeftClick = () => {
        setClicks({...clicks, left: clicks.left+=1})
        setAllClicks(allClicks.concat('L'))
    }

    const  handleRightClick = () => {
        setClicks({...clicks, right: clicks.right+=1})
        setAllClicks(allClicks.concat('R'))
    }

    return (
        <>
            <div>{clicks.left}</div>
            <button onClick={handleLeftClick}>left</button>
            <div>{clicks.right}</div>
            <button onClick={handleRightClick}>right</button>
            <History allClicks={allClicks}/>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
