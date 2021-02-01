import React from 'react'

const Total = ({parts}) => {
    return (
        <>
            <b>Total of {parts.reduce((a,b) => a + b.exercises, 0)} exercises</b>
        </>
    )
}

export default Total