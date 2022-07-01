import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const buildingSlice = createSlice({
    name: "building",
    initialState: {
        explore:{
            building: [],
            customerBuildingDealing: []
        }
    },
    reducers:{
        setExploreBuilding(state, action){
            const { payload } = action;
            state.explore.building = payload.building;
        }, setExploreCustomerBuildingDealing(state, action){
            const { payload } = action;
            state.explore.customerBuildingDealing = payload.customerBuildingDealing;
        }
    }
});

export const {setExploreBuilding, setExploreCustomerBuildingDealing} = buildingSlice.actions;

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

export const getCustomerDealingBuilding = () => async(dispatch, getState) => {
    const {usersReducer : {token}} = getState();
    try{
        const { data } = await api.customerBuildingDealingTable(`Bearer ${token}`);
        dispatch(setExploreCustomerBuildingDealing({
            customerBuildingDealing: data
        }));
    } catch(e){
        console.log("여기는 buildingSlice.js - getCustomerDealingBuilding");
        console.warn(e);
    }
};

export default buildingSlice.reducer;