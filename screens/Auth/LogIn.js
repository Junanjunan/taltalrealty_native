import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import Input from "../../components/Auth/Input";
import { userLogin } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";
import Btn from "../../components/Auth/Btn";


const Container = styled.View`
    flex:1;
    alignItems: center;
    justifyContent: center;
`;


export default () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = () => {
        dispatch(userLogin({
            username: email,
            password
        }))
    }
    return(
        <Container>
            <Input keyboardType="email-address" placeholder="E-mail" value={email} stateFn={setEmail}/>
            <Input placeholder="password" value={password} stateFn={setPassword} isPassword={true} />
            <Btn text={"Log in"} onPress={handleSubmit} />
        </Container>
    );
}