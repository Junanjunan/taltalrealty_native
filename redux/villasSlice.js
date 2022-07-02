import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const villaSlice = createSlice({
    name: "books",
    initialState: {
        explore:{
            villas: [],
            villaLease: [],
            customerVillaDealing:[],
            customerVillaLease:[]
        }
    },
    reducers:{
        setExploreVillas(state, action){
            const { payload } = action;
            state.explore.villas = payload.villas;
        },
        setExploreVillaLease(state, action){
            const { payload } = action;
            state.explore.villaLease = payload.villaLease;
        },
        setExploreCustomerVillaDealing(state, action){
            const { payload } = action;
            state.explore.customerVillaDealing = payload.customerVillaDealing;
        },
        setExploreCustomerVillaLease(state, action){
            const { payload } = action;
            state.explore.customerVillaLease = payload.customerVillaLease;
        }
    }
});

export const {setExploreVillas, setExploreVillaLease, setExploreCustomerVillaDealing, setExploreCustomerVillaLease} = villaSlice.actions;

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

export const getLeaseVilla = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.villaLeaseTable(`Bearer ${token}`);
        dispatch(setExploreVillaLease({
            villaLease: data
        }));
    } catch(e){
        console.log("여기는 villasSlice.js getLeaseVilla");
        console.warn(e);
    }
};

export const getCustomerDealingVilla = () => async(dispatch, getState) => {
    const {usersReducer : {token}} = getState();
    try{
        const { data } = await api.customerVillaDealingTable(`Bearer ${token}`);
        dispatch(setExploreCustomerVillaDealing({
            customerVillaDealing: data
        }));
    } catch(e){
        console.log("여기는 villasSlice.js - getCustomerDealingVilla");
        console.warn(e);
    }
};

export const getCustomerLeaseVilla = () => async(dispatch, getState) => {
    const {usersReducer : {token}} = getState();
    try{
        const { data } = await api.customerVillaLeaseTable(`Bearer ${token}`);
        dispatch(setExploreCustomerVillaLease({
            customerVillaLease: data
        }));
    } catch(e){
        console.log("여기는 villasSlice.js - getCustomerLeaseVilla");
        console.warn(e);
    }
}

export default villaSlice.reducer;