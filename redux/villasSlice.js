import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const villaSlice = createSlice({
    name: "books",
    initialState: {
        explore:{
            villas: []
        }
    },
    reducers:{
        setExploreVillas(state, action){
            const { payload } = action;
            state.explore.villas = payload.villas;
        }
    }
});

export const {setExploreVillas} = villaSlice.actions;

export const getDealingVillas = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.villaDealingTable(`Bearer ${token}`);
        dispatch(setExploreVillas({
            villas: data
        }));
    } catch(e){
        console.log("여기는 villasSlice.js");
        console.warn(e);
    }
};

export default villaSlice.reducer;