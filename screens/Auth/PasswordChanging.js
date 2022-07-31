import React, { useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Input from "../../components/Auth/Input";
import Btn from "../../components/Auth/Btn";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";

const { width, height } = Dimensions.get("screen");

const Container = styled.View`
    height: ${height*3/5}px;
    alignItems: center;
    justifyContent: center;
`;

const PasswordChanging = (props) => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    async function sendingData(){
        if(!password || !newPassword || !newPasswordConfirm){
            alert("기존 비밀번호와 새비밀번호를 모두 입력해주세요");
        } else if(newPassword !== newPasswordConfirm){
            alert("새비밀번호를 다시 확인해주세요");
        } else{
            const form ={
                password: password,
                new_password: newPassword
            };

            AsyncStorage.getItem("csrftoken").then(value=>{
                return api.passwordChanging(props.id, form, value);
            }).then(data => {
                alert("비밀번호가 변경되었습니다.");
                props.navigation.navigate("Profile");
            }).catch(e => {
                alert("알수 없는 오류가 발생");
                console.log(e);
            });
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

function mapStateToProps(state){
    return state.usersReducer;
};

export default connect(mapStateToProps)(PasswordChanging);