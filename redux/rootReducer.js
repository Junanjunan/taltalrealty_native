import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import apartsReducer from "./apartsSlice";
import villasReducer from "./villasSlice";
import contractReducer from "./contractSlice";
import managementReducer from "./managementSlice";


export default combineReducers({
    usersReducer,
    apartsReducer,
    villasReducer,
    contractReducer,
    managementReducer
})