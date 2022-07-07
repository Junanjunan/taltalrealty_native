import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name: "navigation",
    initialState: {
        book: false,
        contract: false,
        management: false,
        profile: false
    },
    reducers:{
        setNavBook(state, action){
            state.book = true;
            state.contract = false;
            state.management = false;
            state.profile = false;
        },
        setNavContract(state, action){
            state.book = false;
            state.contract = true;
            state.management = false;
            state.profile = false;
        },
        setNavManagement(state, action){
            state.book = false;
            state.contract = false;
            state.management = true;
            state.profile = false;
        },
        setNavProfile(state, action){
            state.book = false;
            state.contract = false;
            state.management = false;
            state.profile = true;
        }
    }
});

export const {setNavBook, setNavContract, setNavManagement, setNavProfile} = navigationSlice.actions;

export const doSetNavBook = () => async dispatch => {
    try{
        dispatch(setNavBook());
    } catch(e){
        console.warn(e);
    }
};

export const doSetNavContract = () => async dispatch => {
    try{
        dispatch(setNavContract());
    } catch(e){
        console.warn(e);
    }
};

export const doSetNavManagement = () => async dispatch => {
    try{
        dispatch(setNavManagement());
    } catch(e){
        console.warn(e);
    }
};

export const doSetNavProfile = () => async dispatch => {
    try{
        dispatch(setNavProfile());
    } catch(e){
        console.warn(e);
    }
};

export default navigationSlice.reducer