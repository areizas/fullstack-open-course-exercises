import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => {
    return(
        <thead>
            <tr>
                <th align='left'>{text}</th>
                <th align='left'>{value}</th>
            </tr>
        </thead>
    )
}

const Statistics = ({statistics}) => {
    const all = statistics.reduce( (a,b) => a + b.value , 0)
    if(all === 0){
        return (<p>No feedback given</p>)
    }
    return(
        <>
            <table>
                <Statistic text={statistics[0].name} value={statistics[0].value} />
                <Statistic text={statistics[1].name} value={statistics[1].value} />
                <Statistic text={statistics[2].name} value={statistics[2].value} />
                <Statistic text="all" value={statistics[2].value} />
                <Statistic text="average" value={(statistics[0].value-statistics[2].value)/all} />
                <Statistic text="positive" value={statistics[0].value/all} />
            </table>
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

    const statistics = [
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
            <Statistics statistics={statistics}/>

        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))