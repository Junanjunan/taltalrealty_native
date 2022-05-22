import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    justifyContent: center;
    alignItems: center;
    flex: 1;
`;

const Text = styled.Text``;

export default () => {
    return (
        <Container>
            <Text>Main</Text>
        </Container>
    );
}