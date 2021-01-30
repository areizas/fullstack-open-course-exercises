import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const BestAnecdote = ({anecdote, vote}) => {
    return(
        <div>
            <h1>Anecdote with most votes</h1>
            <div>{anecdote}</div>
            <div>It has {vote} votes</div>
        </div>
    )
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes]  = useState(new Array(anecdotes.length).fill( 0))
    const [maxVotedIndex, setMaxVotedIndex] = useState(0)

    const handleSelectNext = () => setSelected(Math.random()*anecdotes.length | 0)

    const handleVote = () => {
        const copy = [...votes]
        copy[selected]+=1
        setVotes(copy)

        const getMax = (votes) => {
            let max = 0
            let maxIndex = 0
            votes.forEach( (el,index) => {
                if(el>max){
                    max = el
                    maxIndex = index
                }
            })
            return maxIndex
        }
        setMaxVotedIndex(getMax(copy))
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <div>Has {votes[selected]} votes</div>
            <Button handleClick={handleVote} text="vote"/>
            <Button handleClick={handleSelectNext} text="next anecdote"/>
            <BestAnecdote anecdote={anecdotes[maxVotedIndex]} vote={votes[maxVotedIndex]}/>
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'))