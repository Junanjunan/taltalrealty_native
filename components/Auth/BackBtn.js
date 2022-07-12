import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";


const Container = styled.View`
    padding-left:10px;
`


export default () => (
    <Container>
        <Ionicons 
            name = "arrow-down"
            size = {28}
        />
    </Container>
)