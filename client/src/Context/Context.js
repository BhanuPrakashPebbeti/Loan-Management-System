import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Reducer from './Reducer';
import { SERVER_URL } from '../EditableStuff/Config';
import { Cookies } from 'react-cookie';

const INIT_STATE = {
    user: null,
    logged_in: 0,
}

export const Context = createContext(INIT_STATE);

const ContextProvider = ({ children }) => {
    let [state, dispatch] = useReducer(Reducer, INIT_STATE);
    const cookies = new Cookies();
    const newState = async () => {
        axios.get(`${SERVER_URL}/employees/userdetails?id=${cookies.get('id')}`, {
            headers: {
                "Authorization": `Bearer ${cookies.get('token')}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                dispatch({
                    type: "LOGGED_IN",
                    payload: {
                        user: res.data,
                        logged_in: 1
                    }
                });
            }).catch(err => {
                dispatch({
                    type: "LOGOUT",
                    payload: {
                        user: null,
                        logged_in: -1,
                    }
                });
            });
    };
    useEffect(() => {
        newState();
    }, []);

    return (
        <Context.Provider value={{ ...state, dispatch }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;