import React, { useState } from "react";
import { View, Text} from "react-native";
import styled from "styled-components/native";
import { WebView } from 'react-native-webview';
import axios from "axios";
import Modal from "react-native-modal";
import { userSocialLogin, logIn } from "../../redux/usersSlice";
import { useDispatch } from "react-redux";
import api from "../../api";
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from "@react-native-async-storage/async-storage";



const TestBtn = styled.TouchableOpacity`
    backgroundColor: red;
    height: 50px;
`;


const runFirst = `
        const user_pk = document.getElementById("idDiv").innerHTML
        const encoded_jwt = document.getElementById("tokenDiv").innerHTML
        // window.ReactNativeWebView.postMessage(user_pk);
        // alert(window.document.cookie);        
        const cookie = window.document.cookie;
        const obj = {'user_pk': user_pk, 'access_token':encoded_jwt, 'cookie': cookie}
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
        true;
    `;

const runBeforeFirst = `
    window.isNativeApp = true;
    true;
`;

const KakaoLogin = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [sample, setSample] = useState("sample");
    const [email, setEmail] = useState("email");
    const [result, setResult] = useState(null);
    const dispatch = useDispatch();
    return (
        <>
        <Modal 
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            // style={{
            //     flex:1
            // }}
        >
        <View style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={false}
                style={{ marginTop: 30 }}
                // source={{ uri: 'http://taltalrealty31-dev.ap-northeast-2.elasticbeanstalk.com/users/login/' }}
                source={{ uri: 'https://fe6c-59-6-83-58.jp.ngrok.io/users/login/'}}
                injectedJavaScript={runFirst}
                injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                javaScriptEnabled={true}
                sharedCookiesEnabled={true}
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
        </View>
        </Modal>
        <View>
            <TestBtn
                onPress={() => setModalVisible(!modalVisible)}
            >
                <Text>와우와우</Text>
                <Text>{sample}</Text>
            </TestBtn>
        </View>
        </>

    );
};

export default KakaoLogin;