import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';

const AuthContext = createContext();
const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const checkLogin = async () => {
        const result = await axios.get(`/login/status`);
        setLoggedIn(result.data);
    }
    const userName = sessionStorage.getItem('userName');
    useEffect(() => {
        checkLogin();
    }, [])
    return (
        <AuthContext.Provider value={{ loggedIn, userName, checkLogin, setLoggedIn }}>
                {props.children}
        </AuthContext.Provider>
    )
}

export default  AuthContext

export { AuthContextProvider }