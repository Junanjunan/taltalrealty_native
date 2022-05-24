import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import { connect, useSelector } from "react-redux";
import Auth from "../navigation/Auth";
import Main from "../navigation/Main";


const Gate = ({isLoggedIn}) => {
    // const { isLoggedIn } = useSelector(state => usersReducer);
    // console.log(isLoggedIn);
    return(
        <NavigationContainer>
            {isLoggedIn ? <Main /> : <Auth />}
        </NavigationContainer>
    );
}

const mapStateToProps = state => {
    console.log(state);
    return {isLoggedIn: true}
};

export default connect(mapStateToProps)(Gate);