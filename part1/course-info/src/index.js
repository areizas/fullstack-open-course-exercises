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
    props.parts.forEach(part => {
        contens.push(<p> {part.name} {part.exercises}</p>)
    });

    return(
        <div>
            {contens}
        </div>
    )
};

const Total = (props) =>{
    let totalEx = 0;
    props.parts.forEach(part => {
        totalEx+=part.exercises;
    });

    return(
      <div>
          <p> {props.message} {totalEx} </p>
      </div>
    )
};

const App = () => {
    const course = 'Half Stack application development'
    const parts=[
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts}/>
            <Total message="Number of exercises" parts={parts}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));