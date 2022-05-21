import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";


const ContainerText = styled.Text``;

export default () => {
    return(
        <>
            <ContainerText>Home</ContainerText>
            <Text>Log In</Text>
            <Text>Sign Up</Text>
        </>
    );
}