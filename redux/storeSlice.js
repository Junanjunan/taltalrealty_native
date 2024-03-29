import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const storeSlice = createSlice({
    name: "store",
    initialState: {
        explore:{
            store: [],
            storeLease: [],
            customerStoreDealing:[],
            customerStoreLease:[]
        }
    },
    reducers:{
        setExploreStore(state, action){
            const { payload } = action;
            state.explore.store = payload.store;
        },
        setExploreStoreLease(state, action){
            const { payload } = action;
            state.explore.storeLease = payload.storeLease;
        },
        setExploreCustomerStoreDealing(state, action){
            const { payload } = action;
            state.explore.customerStoreDealing = payload.customerStoreDealing;
        },
        setExploreCustomerStoreLease(state, action){
            const { payload } = action;
            state.explore.customerStoreLease = payload.customerStoreLease;
        }
    }
});

export const {setExploreStore, setExploreStoreLease, setExploreCustomerStoreDealing, setExploreCustomerStoreLease} = storeSlice.actions;

export const getDealingStore = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.storeDealingTable(`Bearer ${token}`);
        dispatch(setExploreStore({
            store: data
        }));
    } catch(e){
        console.log("여기는 storeSlice.js");
        console.warn(e);
    }
};

export const getLeaseStore = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.storeLeaseTable(`Bearer ${token}`);
        dispatch(setExploreStoreLease({
            storeLease: data
        }));
    } catch(e){
        console.log("여기는 storeSlice.js getLeaseStore");
        console.warn(e);
    }
};

export const getCustomerDealingStore = () => async(dispatch, getState) => {
    const {usersReducer : {token}} = getState();
    try{
        const { data } = await api.customerStoreDealingTable(`Bearer ${token}`);
        dispatch(setExploreCustomerStoreDealing({
            customerStoreDealing: data
        }));
    } catch(e){
        console.log("여기는 apartmentSlice.js - getCustomerStoreDealing");
        console.warn(e);
    }
};

export const getCustomerLeaseStore = () => async(dispatch, getState) => {
    const {usersReducer : {token}} = getState();
    try{
        const { data } = await api.customerStoreLeaseTable(`Bearer ${token}`);
        dispatch(setExploreCustomerStoreLease({
            customerStoreLease: data
        }));
    } catch(e){
        console.log("여기는 apartmentSlice.js - getCustomerStoreLease");
        console.warn(e);
    }
};


export default storeSlice.reducer;