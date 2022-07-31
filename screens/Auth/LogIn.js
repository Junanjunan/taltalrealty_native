import React, { useState } from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import Modal from "react-native-modal";
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "../../components/Auth/Input";
import { userLogin } from "../../redux/usersSlice";
import Btn from "../../components/Auth/Btn";
import HomeUrl from "../../components/HomeUrl";

const Container = styled.View`
    flex:1;
    alignItems: center;
    justifyContent: center;
`;

const runFirst = `
        const cookie = window.document.cookie;
        const obj = {'cookie': cookie}
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
        true;
    `;

export default () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
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
        <>
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
        <WebView
            source = {{ uri: HomeUrl + "/users/request-reset-link/" }}
            injectedJavaScript={runFirst}
            onMessage={async (event) => {
                const obj = JSON.parse(event.nativeEvent.data);
                var cookie = obj.cookie;
                var cookieSplit = cookie.split('=');
                const csrftoken = cookieSplit[1];
                AsyncStorage.setItem("csrftoken", csrftoken);
            }}
        />
        </Modal>
        <Container>
            <Input keyboardType="email-address" placeholder="이메일" value={email} stateFn={setEmail}/>
            <Input placeholder="비밀번호" value={password} stateFn={setPassword} isPassword={true} />
            <Btn text={"로그인"} onPress={handleSubmit} />
        </Container>
        </>
    );
}