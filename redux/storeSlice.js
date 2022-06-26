import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const storeSlice = createSlice({
    name: "store",
    initialState: {
        explore:{
            store: []
        }
    },
    reducers:{
        setExploreStore(state, action){
            const { payload } = action;
            state.explore.store = payload.store;
        }
    }
});

export const {setExploreStore} = storeSlice.actions;

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

export default storeSlice.reducer;