import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const apartmentSlice = createSlice({
    name: "apartment",
    initialState: {
        explore:{
            apartment: [],
            apartmentLease: [],
            customerApartmentDealing: [],
            customerApartmentLease: []
        }
    },
    reducers:{
        setExploreApartment(state, action){
            const { payload } = action;
            state.explore.apartment = payload.apartment;
        },
        setExploreApartmentLease(state, action){
            const { payload } = action;
            state.explore.apartmentLease = payload.apartmentLease;
        },
        setExploreCustomerApartmentDealing(state, action){
            const { payload } = action;
            state.explore.customerApartmentDealing = payload.customerApartmentDealing;
        },
        setExploreCustomerApartmentLease(state, action){
            const { payload } = action;
            state.explore.customerApartmentLease = payload.customerApartmentLease;
        }
    }
});

export const {setExploreApartment, setExploreApartmentLease, setExploreCustomerApartmentDealing, setExploreCustomerApartmentLease} = apartmentSlice.actions;

export const getDealingApartment = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.apartmentDealingTable(`Bearer ${token}`);
        dispatch(setExploreApartment({
            apartment: data
        }));
    } catch(e){
        console.log("여기는 apartmentSlice.js");
        console.warn(e);
    }
};

export const getLeaseApartment = () => async(dispatch, getState) => {
    const {usersReducer : {token}} = getState();
    try{
        const { data } = await api.apartmentLeaseTable(`Bearer ${token}`);
        dispatch(setExploreApartmentLease({
            apartmentLease: data
        }));
    } catch(e){
        console.log("여기는 apartmentSlice.js - getLeaseApartment");
        console.warn(e);
    }
};

export const getCustomerDealingApartment = () => async(dispatch, getState) => {
    const {usersReducer : {token}} = getState();
    try{
        const { data } = await api.customerApartmentDealingTable(`Bearer ${token}`);
        dispatch(setExploreCustomerApartmentDealing({
            customerApartmentDealing: data
        }));
    } catch(e){
        console.log("여기는 apartmentSlice.js - getCustomerApartmentDealing");
        console.warn(e);
    }
};

export const getCustomerLeaseApartment = () => async(dispatch, getState) => {
    const {usersReducer : {token}} = getState();
    try{
        const { data } = await api.customerApartmentLeaseTable(`Bearer ${token}`);
        dispatch(setExploreCustomerApartmentLease({
            customerApartmentLease: data
        }));
    } catch(e){
        console.log("여기는 apartmentSlice.js - getCustomerApartmentLease");
        console.warn(e);
    }
};

export default apartmentSlice.reducer;