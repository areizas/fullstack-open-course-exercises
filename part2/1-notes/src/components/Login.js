import React, {useState} from "react";
import loginService from "../services/login";

const Login = ({setUser, setErrorMessage}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (e) {
            setErrorMessage('Wrong Credentials')
            setTimeout(()=>{
                setErrorMessage(null)
            },5000)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default Login