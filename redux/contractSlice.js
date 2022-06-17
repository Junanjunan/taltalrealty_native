import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const contractSlice = createSlice({
    name: "contract",
    initialState: {
        explore:{
            contract: []
        }
    },
    reducers: {
        setExploreContract(state, action){
            const { payload } = action;
            state.explore.contract = payload.contract;
        }
    }
});


export const { setExploreContract } = contractSlice.actions;

export const getContract = () => async (dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    console.log(token);
    try{
        const { data } = await api.contractTable(`Bearer ${token}`);
        dispatch(setExploreContract({
            contract: data
        }));
    } catch(e){
        console.log("contractSlice.js catch(e)");
        console.warn(e);
    }
};

export default contractSlice.reducer;