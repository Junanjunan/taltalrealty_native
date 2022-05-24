import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import apartsReducer from "./apartsSlice";


export default combineReducers({
    usersReducer,
    apartsReducer
})