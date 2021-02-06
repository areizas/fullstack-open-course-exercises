import React from "react";
import Person from "./Person";

const Persons = ({persons,handleDeleteButton}) => {
    return (
        <div>
            <h2>Numbers</h2>
            <table>
                <thead>
                    <tr>
                        <th align='left'>Name</th>
                        <th align='left'>Number</th>
                    </tr>
                </thead>
                {persons.map( person => <Person key={person.name} person={person} handleDeleteButton={handleDeleteButton}/>)}
            </table>
        </div>
    )
}

export default Persons