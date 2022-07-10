import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView } from 'react-native';
import { connect, useDispatch, useSelector } from "react-redux";
import Auth from "../navigation/Auth";
import Main from "../navigation/Main";


const Gate = () => {
    const { isLoggedIn } = useSelector(state => state.usersReducer);
    return(
        <NavigationContainer>
                {isLoggedIn ? <Main /> : <Auth />}
        </NavigationContainer>
    );
}

export default Gate;