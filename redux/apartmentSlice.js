import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const apartmentSlice = createSlice({
    name: "apartment",
    initialState: {
        explore:{
            apartment: [],
            apartmentLease: [],
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
        }
    }
});

export const {setExploreApartment, setExploreApartmentLease} = apartmentSlice.actions;

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
}

export default apartmentSlice.reducer;