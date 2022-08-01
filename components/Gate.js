import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Auth from "../navigation/Auth";
import Main from "../navigation/Main";
import { StatusBar } from "react-native";


const Gate = () => {
    const { isLoggedIn, token, id } = useSelector(state => state.usersReducer);
    console.log(isLoggedIn);
    console.log(token);
    console.log(id);
    return(
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            {isLoggedIn || token || id ? <Main /> : <Auth />}
        </NavigationContainer>
    );
}

export default Gate;