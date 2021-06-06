import { createContext } from 'react';

function def() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: def,
    logout: def,
    isAuth: false
});