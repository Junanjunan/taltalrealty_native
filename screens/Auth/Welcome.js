import React, { useState } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { BlurView } from 'expo-blur';
import Btn from "../../components/Auth/Btn";
import { WebView } from 'react-native-webview';
import Modal from "react-native-modal";
import { userSocialLogin, logIn } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";
import api from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeUrl from "../../components/HomeUrl";


const LOGO_URL = "http://logok.org/wp-content/uploads/2014/07/airbnb-logo-belo-219x286.png";

const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    height: 100%;
`;

const Image = styled.Image`
    position: absolute;
    z-index:-1;
    top: 0;
    width: 100%;
    height: 100%;
`;

const Logo = styled.Image` 
    width: 100px;
    height: 100px;
`;

const BtnContainer = styled.View``;

const TestBtn = styled.TouchableOpacity`
    backgroundColor: red;
    height: 50px;
`;

const runFirst = `
        console.log(window.document);
        const user_pk = document.getElementById("idDiv").innerHTML;
        const encoded_jwt = document.getElementById("tokenDiv").innerHTML;
        const cookie = window.document.cookie;
        const obj = {'user_pk': user_pk, 'access_token':encoded_jwt, 'cookie': cookie}
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
        true;
    `;


export default ({ navigation }) => {
    const goToSignUp = () => navigation.navigate("SignUp");
    const goToLogIn = () => navigation.navigate("LogIn");
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    return(
        <>
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
        <WebView
            // source={{ uri: 'https://8821-121-130-89-131.jp.ngrok.io/users/login/app/'}}
            source = {{ uri: HomeUrl + "/users/login/app" }}
            // source={{ uri: 'http://taltalrealty31-dev.ap-northeast-2.elasticbeanstalk.com/users/login/' }}
            injectedJavaScript={runFirst}
            javaScriptEnabled={true}
            onMessage={async (event) => {
                const obj = JSON.parse(event.nativeEvent.data);
                const user_pk = obj.user_pk;
                var cookie = obj.cookie;
                var cookieSplit = cookie.split('=');
                const csrftoken = cookieSplit[1];
                const {data: {encoded_jwt, user_id}} = await api.socialLogin(user_pk);
                AsyncStorage.setItem("csrftoken", csrftoken);
                dispatch(logIn({token:encoded_jwt, id:user_id}));
            }}
        />
        </Modal>
        <Container>
            <BlurView
                intensity={20}
                tint="light"
                style={{
                    flex: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <BtnContainer>
                    <Btn onPress={goToSignUp} text={"회원가입"} accent={true} />
                    <Btn onPress={goToLogIn} text={"로그인"} />
                    <Btn onPress={() => setModalVisible(!modalVisible)} text={"소셜로그인"} />
                </BtnContainer>
            </BlurView>
            <Image source={require("../../assets/loginBg.jpg")} />
            <StatusBar barStyle="light-content" />
        </Container>
        </>
    );
};