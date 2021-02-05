import React, {useState} from 'react'
import CountryInformation from "./CountryInformation";

const Country = ({country}) => {

    const [hidden, setHidden] = useState(true)

    const handleOnClick = () => setHidden(!hidden)

    return (
        <div>
            <b>{country.name}  </b>
            <button onClick={handleOnClick}>show</button>
            <div hidden={hidden}>
                <CountryInformation country={country}/>
            </div>
        </div>
    )
}

export default Country