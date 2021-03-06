import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';

const AuthContext = createContext();
const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const checkLogin = async () => {
        const result = await axios.get(`/login/status`);
        setLoggedIn(result.data);
    }
    const user = sessionStorage.getItem('user');
    const userName=user?user.name:null
    useEffect(() => {
        checkLogin();
    }, [])
    return (
        <AuthContext.Provider value={{ loggedIn, userName,user, checkLogin, setLoggedIn }}>
                {props.children}
        </AuthContext.Provider>
    )
}

export default  AuthContext

export { AuthContextProvider }