import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const bookSlice = createSlice({
    name: "books",
    initialState: {
        explore:{
            apartments: [],
            villas: []
        },
        reducers:{
            setExploreVillas(state, action){
                const { payload } = action;
                state.explore.villas = payload.villas;
            }
        }
    }
});

export const {setExploreVillas} = bookSlice.actions;

export const getVillas = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.villas(`Bearer ${token}`);
        dispatch(setExploreVillas({
            villas: data
        }));
    } catch(e){
        console.log("여기는 booksSlice.js");
        console.warn(e);
    }
};

export default bookSlice.reducer;