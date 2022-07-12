import { combineReducers } from "redux";
import usersReducer from "./usersSlice";
import apartmentReducer from "./apartmentSlice";
import villasReducer from "./villasSlice";
import contractReducer from "./contractSlice";
import managementReducer from "./managementSlice";
import officetelReducer from "./officetelSlice";
import storeReducer from "./storeSlice";
import buildingReducer from "./buildingSlice";
import navigationReducer from "./navigationSlice";


export default combineReducers({
    usersReducer,
    apartmentReducer,
    villasReducer,
    officetelReducer,
    storeReducer,
    buildingReducer,
    contractReducer,
    managementReducer,
    navigationReducer
})