import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import Home from "../screens/Home";
import Auth from "../navigation/Auth";
import Main from "../navigation/Main";

export default() => {

    return(
        <NavigationContainer>
            {false ? <Main /> : <Auth />}            
        </NavigationContainer>
    );
}
