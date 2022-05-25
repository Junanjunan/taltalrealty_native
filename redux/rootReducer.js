import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import apartsReducer from "./apartsSlice";
import contractsReducer from "./contractsSlice";


export default combineReducers({
    usersReducer,
    apartsReducer,
    contractsReducer
})