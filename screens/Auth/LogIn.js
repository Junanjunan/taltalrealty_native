import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import Input from "../../components/Auth/Input";

const Container = styled.View`
    flex:1;
    alignItems: center;
    justifyContent: center;
`;


export default () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    return(
        <Container>
            <Input keyboardType="email-address" placeholder="E-mail" value={email} stateFn={setEmail}/>
            <Input placeholder="password" value={password} stateFn={setPassword} isPassword={true} />
        </Container>
    );
}