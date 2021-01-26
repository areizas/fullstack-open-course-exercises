import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
            <h1>{props.courseName}</h1>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <Part part={props.parts[0]} exercises={props.exercises[0]} />
            <Part part={props.parts[1]} exercises={props.exercises[1]} />
            <Part part={props.parts[2]} exercises={props.exercises[2]} />
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part} {props.exercises}</p>
        </>
    )
}


const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.totalNumExercises}</p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = ['Fundamentals of React','Using props to pass data','State of a component']
    const exercises = [10,7,14]

    return (
        <div>
            <Header courseName={course} />
            <Content parts={parts} exercises={exercises} />
            <Total totalNumExercises={exercises.reduce((a,b)=>a+b)} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))