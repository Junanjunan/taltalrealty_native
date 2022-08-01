import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Auth from "../navigation/Auth";
import Main from "../navigation/Main";
import { StatusBar } from "react-native";


const Gate = () => {
    const { isLoggedIn } = useSelector(state => state.usersReducer);
    return(
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            {isLoggedIn ? <Main /> : <Auth />}
        </NavigationContainer>
    );
}

export default Gate;