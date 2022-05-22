import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
    flex:1;
    alignItems: center;
    justifyContent: center;
`;

export default () => {
    return(
        <Container>
            <Text>LogIn</Text>
        </Container>
    );
}