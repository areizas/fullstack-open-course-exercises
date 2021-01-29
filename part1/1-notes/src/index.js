import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const Display = (props) => {
    return (
        <>
            <p>{props.counter}</p>
        </>
    )
}

const Button = (props) => {
    return(
        <>
            <button onClick={props.handleClick}>{props.text}</button>
        </>
    )
}

const App = () => {
    const [counter, setCounter] = useState(0)

    const increaseByOne = () => setCounter(counter+1)
    const decreaseByOne = () => setCounter(counter-1)
    const setToZero = () => setCounter(0)

    return (
        <>
            <Display counter={counter}></Display>
            <Button handleClick={decreaseByOne} text={"-"}></Button>
            <Button handleClick={setToZero} text={"0"}></Button>
            <Button handleClick={increaseByOne} text={"+"}></Button>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
