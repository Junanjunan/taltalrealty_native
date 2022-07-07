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
            const { payload } = action;
            state.book = true;
            state.contract = false;
            state.management = false;
            state.profile = false;
        }
    }
});

export const {setNavBook} = navigationSlice.actions;