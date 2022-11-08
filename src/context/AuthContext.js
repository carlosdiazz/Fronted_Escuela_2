import React, { useState, useEffect, createContext } from 'react';
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks";

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
});

export function AuthProvider(props){
    const { children } = props;
    const [ auth, setAuth ] = useState(undefined);
    const { getMe } = useUser();

    useEffect(() => {
        (async () => {
            try{
                const token = getToken();
                if (token) {
                    const me = await getMe(token)
                    setAuth({token, me});
                } else {
                    setAuth(null)
                }
            }catch(error){
                removeToken();
                setAuth(null)
                //console.log(error)
            }
        })();
    }, []);

    const login = async (token) => {
        try{
            setToken(token);
            const me = await getMe(token);
            setAuth({ token, me });
        }catch(error){
            //console.log(error)
            removeToken();
            setAuth(null)
        }
    };

    const logout = () => {
        if(auth){
            removeToken();
            setAuth(null)
        }
    };

    const valueContext ={
        auth,
        login,
        logout,
    };

    if (auth === undefined) return null;

    return (
        <AuthContext.Provider value={valueContext}>
            { children }
        </AuthContext.Provider>
    );
}
