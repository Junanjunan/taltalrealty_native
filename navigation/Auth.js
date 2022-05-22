import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Auth/Welcome";
import LogIn from "../screens/Auth/LogIn";
import SignUp from "../screens/Auth/SignUp";
import BackBtn from "../components/Auth/BackBtn";


const Auth = createStackNavigator();

export default () => {
    return(
        <Auth.Navigator
            screenOptions={{
                headerMode: "float",
                // headerBackTitleVisible: true,
                headerTransparent:true,
                presentation: 'modal',
                headerTitleStyle:{
                    color: 'white',
                },
                headerBackImage: () => <BackBtn />
            }}
        >
            <Auth.Screen name="Welcome" component={Welcome} />
            <Auth.Screen name="SignUp" component={SignUp} />
            <Auth.Screen name="LogIn" component={LogIn} />
        </Auth.Navigator>
    );
}