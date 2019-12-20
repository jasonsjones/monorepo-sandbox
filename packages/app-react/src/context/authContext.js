import React, { useContext, useEffect, useReducer } from 'react';
import { executeAuthorizedGqlQuery, refreshToken } from '../services/dataservice';

const FETCH_COMPLETE = 'FETCH_COMPLETE';
const FETCH_ACCESSSTOKEN_REQUEST = 'FETCH_ACCESSTOKEN_REQUEST';
const FETCH_ACCESSSTOKEN_SUCCESS = 'FETCH_ACCESSTOKEN_SUCCESS';

const FETCH_CONTEXTUSER_REQUEST = 'FETCH_CONTEXTUSER_REQUEST';
const FETCH_CONTEXTUSER_SUCCESS = 'FETCH_CONTEXTUSER_SUCCESS';

const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';

const initialState = {
    isFetching: false,
    contextUser: null,
    accessToken: ''
};

const authCtxReducer = (state, action) => {
    switch (action.type) {
        case FETCH_CONTEXTUSER_REQUEST:
        case FETCH_ACCESSSTOKEN_REQUEST:
        case USER_LOGIN_REQUEST:
        case USER_LOGOUT_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_ACCESSSTOKEN_SUCCESS:
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                accessToken: action.payload.token
            };
        case FETCH_CONTEXTUSER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                contextUser: action.payload.user
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                accessToken: '',
                contextUser: null
            };
        case FETCH_COMPLETE:
        case USER_LOGOUT_ERROR:
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isFetching: false
            };
        default:
            return state;
    }
};

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authCtxReducer, initialState);
    const { accessToken } = state;

    useEffect(() => {
        dispatch({ type: FETCH_ACCESSSTOKEN_REQUEST });
        refreshToken().then(res => {
            // add a bit of a delay so the spinner sticks around a little bit
            setTimeout(() => {
                if (res.payload.accessToken) {
                    dispatch({
                        type: FETCH_ACCESSSTOKEN_SUCCESS,
                        payload: { token: res.payload.accessToken }
                    });
                } else {
                    dispatch({ type: FETCH_COMPLETE });
                }
            }, 500);
        });
    }, []);

    useEffect(() => {
        const query = `query {
        me {
            name
            email
        }
    }`;
        if (accessToken !== '') {
            dispatch({ type: FETCH_CONTEXTUSER_REQUEST });
            executeAuthorizedGqlQuery(accessToken, query).then(res => {
                if (res.data.me) {
                    // setContextUser(res.data.me);
                    dispatch({ type: FETCH_CONTEXTUSER_SUCCESS, payload: { user: res.data.me } });
                } else {
                    dispatch({ type: FETCH_COMPLETE });
                }
            });
        }
    }, [accessToken]);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

const useAuthState = () => useContext(AuthStateContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

export { AuthProvider, useAuthState, useAuthDispatch };
