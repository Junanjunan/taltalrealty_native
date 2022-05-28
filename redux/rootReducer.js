import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import apartsReducer from "./apartsSlice";
import contractsReducer from "./contractsSlice";
import booksReducer from "./booksSlice";


export default combineReducers({
    usersReducer,
    apartsReducer,
    booksReducer,
    contractsReducer
})