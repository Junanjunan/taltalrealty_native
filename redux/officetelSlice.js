import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const officetelSlice = createSlice({
    name: "officetel",
    initialState: {
        explore:{
            officetel: []
        }
    },
    reducers:{
        setExploreOfficetel(state, action){
            const { payload } = action;
            state.explore.officetel = payload.officetel;
        }
    }
});

export const {setExploreOfficetel} = officetelSlice.actions;

export const getDealingOfficetel = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.officetelDealingTable(`Bearer ${token}`);
        dispatch(setExploreOfficetel({
            officetel: data
        }));
    } catch(e){
        console.log("여기는 officetelSlice.js");
        console.warn(e);
    }
};

export default officetelSlice.reducer;