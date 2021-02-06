import React from "react";

const Person = ({person,handleDeleteButton}) => {

    return (
        <thead>
            <tr>
                <th align='left' key={person.id}>{person.name}</th>
                <th align='left' key={person.number}>{person.number}</th>
                <th><button onClick={()=>handleDeleteButton(person)}>delete</button></th>
            </tr>
        </thead>
    )
}

export default Person