import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const villaSlice = createSlice({
    name: "books",
    initialState: {
        explore:{
            villas: [],
            villaLease: [],
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
        }
    }
});

export const {setExploreVillas, setExploreVillaLease} = villaSlice.actions;

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

export default villaSlice.reducer;