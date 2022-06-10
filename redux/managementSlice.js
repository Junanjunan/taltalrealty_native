import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const managementSlice = createSlice({
    name: "management",
    initialState:{
        explore:{
            management:[]
        }
    },
    reducers: {
        setExploreManagement(state, action){
            const { payload } = action;
            state.explore.management = payload.management;
        }
    }
});


export const { setExploreManagement } = managementSlice.actions;

export const getManagement = () => async (dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.managementTable(`Bearer ${token}`);
        dispatch(setExploreManagement({
            management:data
        }));
    } catch(e){
        console.log("managementSlice.js catch(e)");
        console.warn(e);
    }
}

export default managementSlice.reducer;