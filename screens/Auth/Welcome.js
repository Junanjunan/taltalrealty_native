import React, { useState } from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { BlurView } from 'expo-blur';
import Btn from "../../components/Auth/Btn";
import { WebView } from 'react-native-webview';
import Modal from "react-native-modal";
import { logIn } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";
import api from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeUrl from "../../components/HomeUrl";


const Container = styled.View`
    alignItems: center;
    width: 100%;
    height: 100%;
`;

const View = styled.View`
    // backgroundColor: #A7EEFF;
    position: absolute;
    top: 150px;
    zIndex: 1;
`;

const Text = styled.Text`
    fontSize: 40px;
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

const BtnContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    // width: 100%;
    // height: 100%;
    // backgroundColor: #A7EEFF;
`;

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
        <View>
            <Text>탈탈 부동산 장부</Text>
        </View>
            <BtnContainer>
                <Btn onPress={goToSignUp} text={"회원가입"} />
                <Btn onPress={goToLogIn} text={"로그인"} />
                <Btn onPress={() => setModalVisible(!modalVisible)} text={"소셜로그인"} />
            </BtnContainer>
            {/* <Image source={require("../../assets/loginBg.jpg")} /> */}
            <StatusBar barStyle="light-content" />
        </Container>
        </>
    );
};