import { createSlice } from "@reduxjs/toolkit";
import api from "../api";


const contractSlice = createSlice({
    name: "contracts",
    initialState: {
        explore: {
            contracts:[]
        }
    },
    reducers:{
        setExploreContracts(state, action){
            const { payload } = action;
            state.explore.contracts = payload;
        }
    }
});

export const { setExploreContracts } = contractSlice.actions;

export const getContracts = () => async(dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const { data } = await api.contracts(`Bearer ${token}`);
        console.log(data);
        dispatch(setExploreContracts({
            contracts: data,
        }));
    } catch(e){
        console.warn(e);
    }
}

export default contractSlice.reducer;