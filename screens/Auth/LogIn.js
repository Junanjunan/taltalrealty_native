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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        if (email === "" || password === ""){
            alert("이메일과 비밀번호를 모두 입력해주세요.");
        } else {
            dispatch(userLogin({
                username: email,
                password
            }));
        }
    };
    return(
        <Container>
            <Input keyboardType="email-address" placeholder="이메일" value={email} stateFn={setEmail}/>
            <Input placeholder="비밀번호" value={password} stateFn={setPassword} isPassword={true} />
            <Btn text={"로그인"} onPress={handleSubmit} />
        </Container>
    );
}