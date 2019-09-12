import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return(
      <div>
          <h1> {props.course}</h1>
      </div>
  )
};

const Content = (props) =>{
    const contens = [];
    for(let i = 0; i<props.parts.length; i++){
        contens.push(<p> {props.parts[i]} {props.exercises[i]}</p>)
    }
    return(
        <div>
            <p> {contens} </p>
        </div>
    )
};

const Total = (props) =>{
  return(
      <div>
          <p> {props.message} {props.numberArray.reduce((a,b) => a+b,0)} </p>
      </div>
  )
};

const App = () => {
    const course = 'Half Stack application development';
    const parts = ['Fundamentals of React','Using props to pass data','State of a component'];
    const exercises = [10,7,14];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} exercises={exercises}/>
            <Total message="Number of exercises" numberArray={exercises}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));