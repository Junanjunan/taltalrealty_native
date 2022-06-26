import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import apartsReducer from "./apartsSlice";
import apartmentReducer from "./apartmentSlice";
import villasReducer from "./villasSlice";
import contractReducer from "./contractSlice";
import managementReducer from "./managementSlice";
import officetelReducer from "./officetelSlice";
import storeReducer from "./storeSlice";
import buildingReducer from "./buildingSlice";

export default combineReducers({
    usersReducer,
    apartsReducer,
    apartmentReducer,
    villasReducer,
    officetelReducer,
    storeReducer,
    buildingReducer,
    contractReducer,
    managementReducer
})