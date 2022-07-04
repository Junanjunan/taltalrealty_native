import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, Text } from "react-native";
import Input from "../../components/Auth/Input";
import Btn from "../../components/Auth/Btn";

const { width, height } = Dimensions.get("screen");

const View = styled.View`
    alignItems: center;
    justifyContent: center;
    height: ${height*8/10}px;
`;

export default () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const handleSubmit = () => {
        
    }

    return(
        <View>
        <Input 
            value={email} 
            placeholder="email" 
            keyboardType="email-address" 
            stateFn = {setEmail}
        />
        <Input 
            value={password} 
            placeholder="password" 
            stateFn = {setPassword}
            isPassword={true}
        />
        <Input 
            value={passwordConfirm} 
            placeholder="password confirm" 
            stateFn = {setPasswordConfirm}
            isPassword={true}
        />
        <Btn text={"Sign Up"} />
        </View>
    );
}