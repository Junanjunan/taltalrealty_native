import AsyncStorage from "@react-native-async-storage/async-storage";
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
            state.id = null;
        }
    }
});

export const {logIn, logOut} = userSlice.actions;

export const getMe = () => async getState => {
    console.log(getState());
};

export const userLogin = form => async dispatch => {
    var token;
    var id;
    AsyncStorage.getItem("csrftoken").then(value => {
        return api.login(form, value);
    }).then(data => {
        token = data.data.token;
        id = data.data.id;
        return api.profile(id);
    }).then(data => {
        const email_verified = data.data.email_verified;
        if(email_verified){
            dispatch(logIn({token: token, id: id}));
        } else{
            alert("이메일 인증을 완료 후 로그인 해주세요.");
        }
    }).catch(e => {
        console.warn(e);
        alert("이메일과 비밀번호를 다시 확인해주세요.");
    })
};

export const userSocialLogin = username => async dispatch => {
    try{
        const data = await api.socialLogin(username);
    } catch(e){
        console.warn(e);
    }
};

export const userLogout = () => async dispatch => {
    try{
        dispatch(logOut());
    } catch(e){
        console.warne(e);
    }
};

export default userSlice.reducer;