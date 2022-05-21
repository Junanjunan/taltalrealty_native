import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../screens/Auth/LogIn";
import SignUp from "../screens/Auth/SignUp";


const Auth = createStackNavigator();

export default () => {
    return(
        <Auth.Navigator
            screenOptions={{
                headerMode: "float",
                headerBackTitleVisible: true,
                // headerTransparent:true,
                // presentation: 'modal',
                headerTitleStyle:{
                    color: 'white',
                }
            }}
        >
            <Auth.Screen name="LogIn" component={LogIn} />
            <Auth.Screen name="SignUp" component={SignUp} />
        </Auth.Navigator>
    );
}