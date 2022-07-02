import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const officetelSlice = createSlice({
    name: "officetel",
    initialState: {
        explore:{
            officetel: [],
            officetelLease: [],
            customerOfficetelDealing: [],
            customerOfficetelLease: []
        }
    },
    reducers:{
        setExploreOfficetel(state, action){
            const { payload } = action;
            state.explore.officetel = payload.officetel;
        },
        setExploreOfficetelLease(state, action){
            const { payload } = action;
            state.explore.officetelLease = payload.officetelLease;
        },
        setExploreCustomerOfficetelDealing(state, action){
            const { payload } = action;
            state.explore.customerOfficetelDealing = payload.customerOfficetelDealing;
        },
        setExploreCustomerOfficetelLease(state, action){
            const { payload } = action;
            state.explore.customerOfficetelLease = payload.customerOfficetelLease;
        }
    }
});

export const {setExploreOfficetel, setExploreOfficetelLease, setExploreCustomerOfficetelDealing, setExploreCustomerOfficetelLease} = officetelSlice.actions;

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

export const getLeaseOfficetel = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.officetelLeaseTable(`Bearer ${token}`);
        dispatch(setExploreOfficetelLease({
            officetelLease: data
        }));
    } catch(e){
        console.log("여기는 officetelSlice.js - getLeaseOfficetel");
        console.warn(e);
    }
};

export const getCustomerDealingOfficetel = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.customerOfficetelDealingTable(`Bearer ${token}`);
        dispatch(setExploreCustomerOfficetelDealing({
            customerOfficetelDealing: data
        }));
    } catch(e){
        console.log("여기는 officetelSlice.js - getCustomerDealingOfficetel");
        console.warn(e);
    }
};

export const getCustomerLeaseOfficetel = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.customerOfficetelLeaseTable(`Bearer ${token}`);
        dispatch(setExploreCustomerOfficetelLease({
            customerOfficetelLease: data
        }));
    } catch(e){
        console.log("여기는 officetelSlice.js - getCustomerLeaseOfficetel");
        console.warn(e);
    }
};

export default officetelSlice.reducer;