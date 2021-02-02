import React from "react";
import Person from "./Person";

const Numbers = ({persons}) => {
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
                {persons.map( person => <Person person={person}/>)}
            </table>
        </div>
    )
}

export default Numbers