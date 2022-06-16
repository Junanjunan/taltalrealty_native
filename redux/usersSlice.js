import { createSlice } from "@reduxjs/toolkit";
import api from "../api";


const userSlice = createSlice({
    name: "users",
    initialState: {
        isLoggedIn: false,
        token: null
    },
    reducers: {
        logIn(state, action){
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        logOut(state, action){
            state.isLoggedIn= false;
            state.token = null;
        }
    }
});

export const {logIn, logOut} = userSlice.actions;

export const getMe = () => async getState => {
    console.log(getState());
};

export const userLogin = form => async dispatch => {
    try{
        const { data: {id, token} } = await api.login(form);
        if (id && token){
            dispatch(logIn({token, id}));
        }
    } catch(e){
        console.warn(e);
    }
};

export const userSocialLogin = username => async dispatch => {
    try{
        console.log(username);
        const data = await api.socialLogin(username);
        // dispatch(logIn({token, id}));
        console.log(data);
    } catch(e){
        console.warn(e);
    }
}

export const userLogout = form => async dispatch => {
    try{
        dispatch(logOut());
    } catch(e){
        console.warne(e);
    }
}

export default userSlice.reducer