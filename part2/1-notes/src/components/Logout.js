import React from "react";

const Logout = ({setUser}) => {

    const handleLogOut = () => {
        window.localStorage.clear()
        setUser(null)
    }

    return(
        <div>
            <button onClick={handleLogOut}> logout </button>
        </div>
    )
}

export default Logout