import { createSlice } from "@reduxjs/toolkit";
import api from "../api";


const apartSlice = createSlice({
    name: "apartments",
    initialState: {
        explore: {
            books: []
        }
    },
    reducers:{
        setExploreBooks(state, action){
            const { payload } = action;
            state.explore.books = payload;
        }
    }
    
});

export const {setExploreBooks} = apartSlice.actions;

export const getBooks = () => async (dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.books(`Bearer ${token}`);
        dispatch(setExploreBooks({
            books: data,
        }));
    } catch(e){
        console.warn(e);
    }
}

export default apartSlice.reducer;