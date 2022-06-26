import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const buildingSlice = createSlice({
    name: "building",
    initialState: {
        explore:{
            building: []
        }
    },
    reducers:{
        setExploreBuilding(state, action){
            const { payload } = action;
            state.explore.building = payload.building;
        }
    }
});

export const {setExploreBuilding} = buildingSlice.actions;

export const getDealingBuilding = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.buildingDealingTable(`Bearer ${token}`);
        dispatch(setExploreBuilding({
            building: data
        }));
    } catch(e){
        console.log("여기는 buildingSlice.js");
        console.warn(e);
    }
};

export default buildingSlice.reducer;