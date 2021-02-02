import React from "react";

const Person = ({person}) => {
    return (
        <thead>
            <tr>
                <th align='left' key={person.name}>{person.name}</th>
                <th align='left' key={person.number}>{person.number}</th>
            </tr>
        </thead>
    )
}

export default Person