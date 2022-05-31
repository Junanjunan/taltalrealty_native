import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import apartsReducer from "./apartsSlice";
import contractsReducer from "./contractsSlice";
import villasReducer from "./villasSlice";


export default combineReducers({
    usersReducer,
    apartsReducer,
    villasReducer,
    contractsReducer
})