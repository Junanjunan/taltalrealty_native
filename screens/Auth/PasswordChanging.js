import React, { useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Input from "../../components/Auth/Input";
import Btn from "../../components/Auth/Btn";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
    height: ${height*3/5}px;
    alignItems: center;
    justifyContent: center;
`;


const Text = styled.Text``;


const PasswordChanging = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    async function sendingData(){
        if(!password || !newPassword || !newPasswordConfirm){
            alert("기존 비밀번호와 새비밀번호를 모두 입력해주세요");
        } else if(newPassword !== newPasswordConfirm){
            alert("새비밀번호를 다시 확인해주세요");
        } else{
            alert("!");
            // const form = {
            //     realtor:id
            // };

            // AsyncStorage.getItem("csrftoken").then(value=>{
            //     return api.contractCreating(form, value);
            // }).then(data => {
            //     alert("계약이 등록되었습니다.");
            //     navigation.navigate("Book");
            // }).catch(e => {
            //     alert("계약일, 잔금일은 필수 입력사항입니다.")
            //     console.warn(e);
            // })
        }
    };

    return (
        <Container>
            <Input placeholder="기존 비밀번호" value={password} stateFn={setPassword} isPassword={true} />
            <Input placeholder="새 비밀번호" value={newPassword} stateFn={setNewPassword} isPassword={true} />
            <Input placeholder="새 비밀번호 확인" value={newPasswordConfirm} stateFn={setNewPasswordConfirm} isPassword={true} />
            <Btn text="비밀번호 변경" onPress={sendingData} />
        </Container>
    );
};

export default PasswordChanging;