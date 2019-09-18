import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return(
      <div>
          <h1> {props.course.name}</h1>
      </div>
  )
};

const Content = (props) =>{
    const contens = [];
    props.course.parts.forEach(part => {
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
    props.course.parts.forEach(part => {
        totalEx+=part.exercises;
    });

    return(
      <div>
          <p> Total Number of exercises {totalEx} </p>
      </div>
    )
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
        ]
    };

    return (
        <div>
            <Header course={course} />
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));