import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import api from "../api";


const userSlice = createSlice({
    name: "users",
    initialState: {
        isLoggedIn: false,
        token: null,
        login_method: null,
        email: null,
        office: null,
        tel: null
    },
    reducers: {
        logIn(state, action){
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.login_method = action.payload.login_method;
            state.email = action.payload.email;
            state.office = action.payload.office;
            state.tel = action.payload.tel;
        },
        logOut(state, action){
            state.isLoggedIn= false;
            state.token = null;
            state.id = null;
            state.login_method = null;
            state.email = null;
            state.office = null;
            state.tel = null;
        },
        updateStatus(state,action){
            state.office = action.payload.office;
            state.tel = action.payload.tel;
        }
    }
});

export const {logIn, logOut, updateStatus} = userSlice.actions;

export const getMe = () => async getState => {
    console.log(getState());
};

export const userLogin = form => async dispatch => {
    
    var token;
    var id;
    AsyncStorage.getItem("csrftoken").then(value => {
        console.log(value);
        return api.login(form, value);
    }).then(data => {
        token = data.data.token;
        id = data.data.id;
        return api.profile(id);
    }).then(data => {
        const email_verified = data.data.email_verified;
        if(email_verified){
            dispatch(logIn({
                token: token, 
                id: id,
                login_method: data.data.login_method,
                email: data.data.username,
                office: data.data.office,
                tel: data.data.tel
            }));
        } else{
            alert("이메일 인증을 완료 후 로그인 해주세요.");
        }
    }).catch(e => {
        console.warn(e);
        alert(e);
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

export const userUpdateStatus = (id, form) => async dispatch => {
    AsyncStorage.getItem("csrftoken").then(value => {
        return api.updateStatus(id, form, value);
    }).then(data => {
        dispatch(updateStatus({office: data.data.office, tel: data.data.tel}));
    }).catch(e =>{
        console.log("여기는 usersSlice.js/userUpdateStatus");
        console.warn(e);
    })
}

export default userSlice.reducer;