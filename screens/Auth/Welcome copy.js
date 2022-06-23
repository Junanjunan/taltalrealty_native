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
        // window.ReactNativeWebView.postMessage(user_pk);
        // alert(window.document.cookie);
        const cookie = window.document.cookie;
        // const document = window.document;
        const obj = {'user_pk': user_pk, 'access_token':encoded_jwt, 'cookie': cookie}
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
        true;
    `;

// const runBeforeFirst = `
//     window.isNativeApp = true;
//     true;
// `;

export default ({ navigation }) => {
    const goToSignUp = () => navigation.navigate("SignUp");
    const goToLogIn = () => navigation.navigate("LogIn");
    // const _handlePressButtonAsync = async () => {
    //     let result = await WebBrowser.openBrowserAsync('https://6113-175-193-30-213.jp.ngrok.io/users/login/');
    //     setResult(result);
    // };
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
                // originWhitelist={['*']}
                // scalesPageToFit={false}
                // style={{
                //     width: 100,
                //     height: 100
                // }}
                // source={{ uri: 'http://taltalrealty31-dev.ap-northeast-2.elasticbeanstalk.com/users/login/' }}
                source={{ uri: 'https://5a49-121-130-89-131.jp.ngrok.io/users/login/'}}
                injectedJavaScript={runFirst}
                // injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                javaScriptEnabled={true}
                // sharedCookiesEnabled={true}
                // onMessage={(event) => { LogInProgress(event.nativeEvent["url"]); }}
                onMessage={async (event) => {
                    // const {data: {encoded_jwt, user_id}} = await api.socialLogin(event.nativeEvent.data);
                    // dispatch(logIn({token:encoded_jwt, id:user_id}));
                    console.log(event.nativeEvent.data);
                    const obj = JSON.parse(event.nativeEvent.data);
                    const user_pk = obj.user_pk;
                    // const access_token = obj.access_token;
                    var cookie = obj.cookie;
                    var cookieSplit = cookie.split('=');
                    console.log(cookieSplit);
                    const csrftoken = cookieSplit[1];
                    const {data: {encoded_jwt, user_id}} = await api.socialLogin(user_pk);
                    AsyncStorage.setItem("csrftoken", csrftoken);
                    dispatch(logIn({token:encoded_jwt, id:user_id}));
                    
                }}
            // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
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
                {/* <Logo source={{uri:LOGO_URL}} /> */}
                <BtnContainer>
                    <Btn onPress={goToSignUp} text={"Sign Up"} accent={true} />
                    <Btn onPress={goToLogIn} text={"Log In"} />
                    {/* <Btn onPress={_handlePressButtonAsync} text={"카카오"} /> */}
                    {/* <Btn onPress={() => navigation.navigate("KakaoLogin")} text={"카카오"} /> */}
                    <Btn onPress={() => setModalVisible(!modalVisible)} text={"카카오"} />
                    <Btn text={"카카오 바로"}/>
                </BtnContainer>
            </BlurView>
            <Image source={require("../../assets/loginBg.jpg")} />
            <StatusBar barStyle="light-content" />
        </Container>
        </>
    );
    };