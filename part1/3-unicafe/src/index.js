import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Display = ({feedbacks}) => {
    const showFeedbacks = () => feedbacks.map((feedback) => <p key={feedback.name}>{feedback.name} {feedback.value}</p>)
    return(
        <>
            {showFeedbacks()}
        </>
    )
}

const App = () => {
    const [good,setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGood = () => setGood(good+1)
    const increaseNeutral = () => setNeutral(neutral+1)
    const increaseBad = () => setBad(bad+1)

    const feedbacks = [
        {
            name: 'good',
            value: good
        },
        {
            name: 'neutral',
            value: neutral
        },
        {
            name: 'bad',
            value: bad
        }
    ]

    return(
        <>
            <Title text={"Give feedback"}/>
            <Button text={"good"} handleClick={increaseGood}/>
            <Button text={"neutral"} handleClick={increaseNeutral}/>
            <Button text={"bad"} handleClick={increaseBad}/>
            <Title text={"statistics"}/>
            <Display feedbacks={feedbacks}/>

        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))